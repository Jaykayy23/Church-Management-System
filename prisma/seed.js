const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const defaultChurchName =
    process.env.NEXT_PUBLIC_CHURCH_NAME || "Labone Church of Christ";
  await prisma.appSetting.upsert({
    where: { slug: "default" },
    update: { churchName: defaultChurchName },
    create: {
      slug: "default",
      churchName: defaultChurchName,
      timezone: "Africa/Accra",
      currency: "GHS",
    },
  });

  const members = [
    {
      firstName: "Adebayo",
      lastName: "Johnson",
      role: "Deacon",
      team: "Ushering",
      phone: "+234 801 234 5678",
      email: "adebayo@email.com",
      joinedAt: new Date("2020-01-01"),
    },
    {
      firstName: "Grace",
      lastName: "Okonkwo",
      role: "Member",
      team: "Choir",
      phone: "+234 802 346 6789",
      email: "grace@email.com",
      joinedAt: new Date("2019-03-01"),
    },
    {
      firstName: "Emmanuel",
      lastName: "Eze",
      role: "Elder",
      team: "Finance",
      phone: "+234 803 456 7890",
      email: "emmanuel@email.com",
      joinedAt: new Date("2015-01-01"),
    },
    {
      firstName: "Blessing",
      lastName: "Nwachukwu",
      role: "Member",
      team: "Children's Ministry",
      phone: "+234 804 567 8901",
      email: "blessing@email.com",
      joinedAt: new Date("2021-09-01"),
    },
    {
      firstName: "Samuel",
      lastName: "Adeyemi",
      role: "Member",
      team: "Leadership",
      phone: "+234 805 678 9012",
      email: "samuel@email.com",
      joinedAt: new Date("2010-01-01"),
    },
    {
      firstName: "Mercy",
      lastName: "Okafor",
      role: "Member",
      team: "Media",
      phone: "+234 806 789 0123",
      email: "mercy@email.com",
      joinedAt: new Date("2022-02-01"),
    },
  ];

  for (const member of members) {
    const existing = await prisma.member.findFirst({
      where: { email: member.email },
    });
    if (!existing) {
      await prisma.member.create({ data: member });
    }
  }

  const events = [
    {
      title: "Sunday Worship Service",
      startAt: new Date("2026-03-09T09:00:00.000Z"),
      location: "Main Sanctuary",
      expectedCount: 342,
      category: "Worship",
    },
    {
      title: "Youth Fellowship",
      startAt: new Date("2026-03-11T17:00:00.000Z"),
      location: "Youth Hall",
      expectedCount: 89,
      category: "Fellowship",
    },
    {
      title: "Bible Study - Book of Romans",
      startAt: new Date("2026-03-12T18:30:00.000Z"),
      location: "Room 201",
      expectedCount: 120,
      category: "Study",
    },
    {
      title: "Prayer Meeting",
      startAt: new Date("2026-03-13T06:00:00.000Z"),
      location: "Chapel",
      expectedCount: 85,
      category: "Prayer",
    },
    {
      title: "Women's Conference",
      startAt: new Date("2026-03-15T10:00:00.000Z"),
      location: "Main Sanctuary",
      expectedCount: 250,
      category: "Conference",
    },
    {
      title: "Children's Sunday School",
      startAt: new Date("2026-03-16T09:00:00.000Z"),
      location: "Children's Wing",
      expectedCount: 78,
      category: "Education",
    },
  ];

  for (const event of events) {
    const existing = await prisma.event.findFirst({ where: { title: event.title } });
    if (!existing) {
      await prisma.event.create({ data: event });
    }
  }

  const projects = [
    {
      title: "New Church Building",
      status: "Active",
      raisedAmount: 32500000,
      goalAmount: 45000000,
    },
    {
      title: "Youth Center Renovation",
      status: "Active",
      raisedAmount: 5200000,
      goalAmount: 8000000,
    },
    {
      title: "Community Outreach Program",
      status: "Completed",
      raisedAmount: 2500000,
      goalAmount: 2500000,
    },
    {
      title: "Sound System Upgrade",
      status: "Active",
      raisedAmount: 1800000,
      goalAmount: 3200000,
    },
    {
      title: "Children's Wing Extension",
      status: "Planning",
      raisedAmount: 3800000,
      goalAmount: 12000000,
    },
  ];

  for (const project of projects) {
    const existing = await prisma.project.findFirst({
      where: { title: project.title },
    });
    if (!existing) {
      await prisma.project.create({ data: project });
    }
  }

  const offertory = [
    { date: "2026-03-02", type: "Sunday Service", givers: 312, amount: 485000 },
    { date: "2026-02-23", type: "Sunday Service", givers: 340, amount: 520000 },
    { date: "2026-02-16", type: "Special Offering", givers: 289, amount: 750000 },
    { date: "2026-02-09", type: "Sunday Service", givers: 298, amount: 445000 },
    { date: "2026-02-02", type: "Sunday Service", givers: 325, amount: 510000 },
    { date: "2026-01-26", type: "Thanksgiving", givers: 410, amount: 1200000 },
  ];

  for (const record of offertory) {
    const existing = await prisma.offertoryRecord.findFirst({
      where: { date: new Date(record.date), type: record.type },
    });
    if (!existing) {
      await prisma.offertoryRecord.create({
        data: { ...record, date: new Date(record.date) },
      });
    }
  }

  const membersByEmail = await prisma.member.findMany({
    select: { id: true, email: true },
  });
  const memberMap = new Map(membersByEmail.map((m) => [m.email, m.id]));

  const contributions = [
    {
      email: "adebayo@email.com",
      type: "Tithe",
      project: "General Fund",
      date: "2026-03-05",
      amount: 150000,
    },
    {
      email: "grace@email.com",
      type: "Offering",
      project: "Building Fund",
      date: "2026-03-04",
      amount: 50000,
    },
    {
      email: "emmanuel@email.com",
      type: "Tithe",
      project: "General Fund",
      date: "2026-03-03",
      amount: 200000,
    },
    {
      email: "blessing@email.com",
      type: "Donation",
      project: "Youth Center",
      date: "2026-03-02",
      amount: 500000,
    },
    {
      email: "samuel@email.com",
      type: "Tithe",
      project: "General Fund",
      date: "2026-03-02",
      amount: 75000,
    },
    {
      email: "mercy@email.com",
      type: "Seed",
      project: "Outreach",
      date: "2026-03-01",
      amount: 100000,
    },
  ];

  for (const contribution of contributions) {
    const memberId = memberMap.get(contribution.email);
    if (!memberId) continue;
    const existing = await prisma.contribution.findFirst({
      where: { memberId, type: contribution.type, date: new Date(contribution.date) },
    });
    if (!existing) {
      await prisma.contribution.create({
        data: {
          memberId,
          type: contribution.type,
          project: contribution.project,
          date: new Date(contribution.date),
          amount: contribution.amount,
        },
      });
    }
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
