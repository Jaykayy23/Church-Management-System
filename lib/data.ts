import { prisma } from "./prisma";

export async function getDashboardStats() {
  const now = new Date();
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

  const [
    totalMembers,
    upcomingEvents,
    activeProjects,
    offertorySum,
    offertoryPrevSum,
    membersCurrent,
    membersPrev,
    activeBudget,
  ] = await Promise.all([
    prisma.member.count(),
    prisma.event.count({ where: { startAt: { gte: now, lt: nextWeek } } }),
    prisma.project.count({ where: { status: "Active" } }),
    prisma.offertoryRecord.aggregate({
      _sum: { amount: true },
      where: { date: { gte: monthStart } },
    }),
    prisma.offertoryRecord.aggregate({
      _sum: { amount: true },
      where: { date: { gte: lastMonthStart, lte: lastMonthEnd } },
    }),
    prisma.member.count({ where: { joinedAt: { gte: thirtyDaysAgo } } }),
    prisma.member.count({
      where: { joinedAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo } },
    }),
    prisma.project.aggregate({
      _sum: { goalAmount: true },
      where: { status: "Active" },
    }),
  ]);

  const currentMembers = membersCurrent ?? 0;
  const prevMembers = membersPrev ?? 0;
  const membersChangePct =
    prevMembers === 0 ? 0 : ((currentMembers - prevMembers) / prevMembers) * 100;

  const currentOffertory = Number(offertorySum._sum.amount ?? 0);
  const prevOffertory = Number(offertoryPrevSum._sum.amount ?? 0);
  const offertoryChangePct =
    prevOffertory === 0 ? 0 : ((currentOffertory - prevOffertory) / prevOffertory) * 100;

  return {
    totalMembers,
    upcomingEvents,
    activeProjects,
    thisMonthOffertory: currentOffertory,
    membersChangePct,
    offertoryChangePct,
    activeBudget: Number(activeBudget._sum.goalAmount ?? 0),
  };
}

export async function getUpcomingEvents(limit = 4) {
  return prisma.event.findMany({
    orderBy: { startAt: "asc" },
    take: limit,
    select: { id: true, title: true, startAt: true, expectedCount: true },
  });
}

export async function getRecentOffertory(limit = 4) {
  return prisma.offertoryRecord.findMany({
    orderBy: { date: "desc" },
    take: limit,
    select: { id: true, type: true, date: true, amount: true },
  });
}

export async function getEvents() {
  return prisma.event.findMany({
    orderBy: { startAt: "asc" },
    select: {
      id: true,
      title: true,
      startAt: true,
      location: true,
      expectedCount: true,
      category: true,
    },
  });
}

export async function getMembers() {
  return prisma.member.findMany({
    orderBy: { lastName: "asc" },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      role: true,
      team: true,
      phone: true,
      email: true,
      joinedAt: true,
    },
  });
}

export async function getProjects() {
  return prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      status: true,
      raisedAmount: true,
      goalAmount: true,
    },
  });
}

export async function getContributions() {
  const rows = await prisma.contribution.findMany({
    orderBy: { date: "desc" },
    include: { member: { select: { firstName: true, lastName: true } } },
  });
  return rows.map((row) => ({
    id: row.id,
    member_name: `${row.member.firstName} ${row.member.lastName}`,
    type: row.type,
    project: row.project,
    date: row.date,
    amount: row.amount,
  }));
}

export async function getOffertoryStats() {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
  const yearStart = new Date(now.getFullYear(), 0, 1);

  const [thisMonth, lastMonth, yearTotal] = await Promise.all([
    prisma.offertoryRecord.aggregate({
      _sum: { amount: true },
      where: { date: { gte: monthStart } },
    }),
    prisma.offertoryRecord.aggregate({
      _sum: { amount: true },
      where: { date: { gte: lastMonthStart, lte: lastMonthEnd } },
    }),
    prisma.offertoryRecord.aggregate({
      _sum: { amount: true },
      where: { date: { gte: yearStart } },
    }),
  ]);

  return {
    thisMonth: Number(thisMonth._sum.amount ?? 0),
    lastMonth: Number(lastMonth._sum.amount ?? 0),
    thisYear: Number(yearTotal._sum.amount ?? 0),
  };
}

export async function getOffertoryRecords() {
  return prisma.offertoryRecord.findMany({
    orderBy: { date: "desc" },
    select: { id: true, date: true, type: true, givers: true, amount: true },
  });
}

export async function getUserByUsername(username: string) {
  return prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      name: true,
      role: true,
      passwordHash: true,
    },
  });
}

export async function createUser({
  username,
  name,
  role,
  passwordHash,
}: {
  username: string;
  name: string | null;
  role: "admin" | "staff";
  passwordHash: string;
}) {
  return prisma.user.create({
    data: {
      username,
      name,
      role,
      passwordHash,
    },
    select: { id: true, username: true, name: true, role: true },
  });
}

export async function healthCheck() {
  const result = await prisma.$queryRaw<{ ok: number }[]>`SELECT 1 as ok`;
  return result[0]?.ok === 1;
}
