/* ==========================================================================
   CONTENT FILE: everything you can read on the site lives here.
   Edit text between quotes, save, refresh. No build step.

   - Empty text ('') = a TODO. The site hides it on the live page.
   - Media paths point into /assets. Drop a file at that exact path and it
     appears. Missing files never break the page.
   - Run `node tools/check.mjs` to list what is still empty.
   ========================================================================== */

export const site = {
  name: 'Marina Chavez',
  title: 'Marina Chavez · Software Engineering student',
  description:
    'Software Engineering student at VIA University College, Denmark. Open to a software engineering internship (Aug-Dec 2027) and a student job.',
  availability: 'Open to: internship Aug–Dec 2027 · student job ~60 h/month',
  availabilityShort: 'Available 2027',
  links: {
    linkedin: 'https://www.linkedin.com/in/monsmce',
    github: 'https://github.com/monsmce',
    cv: 'assets/cv/marina-chavez-cv.pdf',
    email: '', // TODO: your public email, e.g. 'hello@example.com'
    phone: '', // TODO: your phone, e.g. '+45 12 34 56 78' (only shown after a click)
  },
};

export const hero = {
  hi: 'hiii!',
  lines: ['Hi, I’m Marina.', 'I aim {high}.'], // {word} = the word that floats up
  note: 'and then I do the work to get there',
  intro:
    'Software Engineering student at VIA University College in Horsens, Denmark. I build full-stack systems with Java, C# and React, and I like leading the team that ships them.',
  scrollHint: 'this is just a little part of me',
  portrait: { src: 'assets/brand/portrait.jpg', alt: '' }, // TODO: a photo of you, 3:4. Empty = coloured arch with a smiley.
  badge: 'open to work · internship 2027 · student job · ',
  marquee: ['Java', 'C#', 'React', 'Python', 'SQL', 'PostgreSQL', 'gRPC', 'Scrum', 'Git', '.NET', 'JavaFX', 'TypeScript (soon)'],
};

/* ------------------------------ PROJECTS --------------------------------- */
// links.repo / links.demo: leave '' to hide the button.
export const projects = [
  {
    slug: 'desmi-seaweed',
    title: 'DESMI Seaweed Platform',
    year: '2026–present',
    tag: 'Real client',
    summary: 'A public website in three languages and an admin dashboard, on a three-tier architecture.',
    problem:
      'DESMI needed a public website in English, Spanish and French, and an admin dashboard to manage it.',
    role: 'Product Owner and Scrum Master. I ran a Scrumban board in GitHub Projects and documented the system with C4 diagrams in Structurizr.',
    decision:
      'Three tiers with clear contracts: a React/Blazor front end, a C# business-logic API over REST, and a Java data server over gRPC with JPA and PostgreSQL.',
    result:
      '20 functional and 9 non-functional requirements delivered, 12 use cases and an 11-table database.',
    stack: ['React', 'Blazor', 'C#', 'ASP.NET Web API', 'REST', 'Java', 'gRPC', 'JPA', 'PostgreSQL'],
    links: { repo: '', demo: '' },
    phone: true,
    architecture: true,
  },
  {
    slug: 'travel-via-via',
    title: 'Travel via VIA',
    year: '2026',
    tag: 'Graded 12',
    summary: 'An airline booking system with a Java socket client and server.',
    problem: 'A semester project: build a working airline booking system as a client-server application.',
    role: 'Product Owner. I wrote and prioritised 20+ user stories in Jira.',
    decision: 'A Java socket client-server design with MVVM on the client, SOLID principles and PostgreSQL for the data.',
    result: 'Graded 12, the top grade on the Danish scale.',
    stack: ['Java', 'Sockets', 'JavaFX', 'MVVM', 'SOLID', 'PostgreSQL', 'Jira'],
    links: { repo: '', demo: '' },
    phone: false,
    architecture: false,
  },
  {
    slug: 'viarooms',
    title: 'ViaRooms',
    year: 'Mar 2026',
    tag: '24-hour hackathon',
    summary: 'A study-room availability prototype, built by a team of four in 24 hours.',
    problem: 'Students could not see which study rooms were free: about 36 rooms across 3 hubs.',
    role: 'Team of 4. I presented the final demo to the jury.',
    decision: 'A React front end on a C#/.NET API, kept small enough to finish and demo in 24 hours.',
    result: 'A working prototype and positive jury feedback.',
    stack: ['React', 'C#', '.NET API'],
    links: { repo: '', demo: '' },
    phone: true,
    architecture: false,
  },
  {
    slug: 'greenclover',
    title: 'GreenClover',
    year: '2025',
    tag: 'Graded 10',
    summary: 'A JavaFX admin app and a responsive web app for eco-village management.',
    problem: 'An eco-village needed one tool for administrators and one view for residents.',
    role: 'Team member on my first semester project.',
    decision: 'Two front ends for two audiences: a JavaFX desktop app for admin work and a responsive web app.',
    result: 'Graded 10.',
    stack: ['Java', 'JavaFX', 'HTML', 'CSS', 'JavaScript'],
    links: { repo: '', demo: '' },
    phone: true,
    architecture: false,
  },
];

/* ----------------------------- EXPERIENCE -------------------------------- */
export const experience = [
  {
    role: 'Programming 1 Tutor',
    org: 'VIA University College',
    dates: 'Sep 2026 – present',
    summary: 'Java and OOP workshops for 18 first-semester students.',
    details: ['18 first-semester students', 'Workshops on Java and object-oriented programming'],
  },
  {
    role: 'Marketing Student Assistant',
    org: 'VIA University College',
    dates: 'Jun 2026 – present',
    summary: 'I automate event communication and run the campus Instagram.',
    details: [
      'Power Automate flows replaced manual emailing for Campus Communities and VIA Community Day',
      '25–50 people per event',
      'Campus Instagram: 93,945 views and 201 new followers in three months',
    ],
  },
  {
    role: 'Marketing Assistant',
    org: 'DESMI Latin America',
    dates: 'Jul – Aug 2026',
    summary: 'Resource tracking lead at a Mexican Navy oil-spill response exercise.',
    details: [
      'Led the resource tracking unit (L-REC) at JOKMAR: four days, 90 participants, 21–24 Jul 2026',
      'Earned official Navy recognition',
      'Supported a UN event in Punta Cana, 17–21 Aug 2026, 13 countries',
    ],
  },
  {
    role: 'Management Assistant',
    org: 'GRC Latinoamerica',
    dates: 'Jul 2024 – Aug 2025',
    summary: 'Logistics and communication for corporate events in Ecuador.',
    details: ['4+ corporate events', 'Logistics and communication'],
  },
  {
    role: 'Sales and Event Presenter',
    org: 'DESMI Latin America',
    dates: '2024',
    summary: 'Presented Sargassum technology in Colombia and Grenada.',
    details: [
      'Sargassum technology training in Colombia, 30+ attendees',
      'EU-Caribbean Global Gateway Conference in Grenada, about 400 attendees, 2 Oct 2024',
    ],
  },
];

export const instagram = {
  eyebrow: 'VIA campus Instagram · 15 Jul – 12 Oct 2026',
  title: 'Three months of posting, in numbers.',
  stats: [
    { value: 93945, prefix: '', suffix: '', label: 'views' },
    { value: 201, prefix: '+', suffix: '', label: 'new followers, a 570% increase' },
    { value: 36, prefix: '', suffix: '%', label: 'of views came from non-followers' },
  ],
  note: 'engineers who can explain things are useful',
};

/* ------------------------------- SKILLS ---------------------------------- */
// The layers are the real DESMI platform architecture, top to bottom.
export const skills = {
  layers: [
    { tier: 'Front end', name: 'React · Blazor', skills: ['React', 'Blazor', 'JavaScript', 'HTML', 'CSS'], wire: 'REST' },
    { tier: 'Business logic', name: 'C# API', skills: ['C#', '.NET', 'ASP.NET Web API', 'REST', 'Unit testing', 'SOLID', 'Design patterns'], wire: 'gRPC' },
    { tier: 'Data server', name: 'Java', skills: ['Java', 'gRPC', 'JPA'], wire: 'JPA · SQL' },
    { tier: 'Database', name: 'PostgreSQL', skills: ['PostgreSQL', 'SQL', 'SQL transactions', 'ER modelling'], wire: '' },
  ],
  groups: [
    { name: 'Python and data', skills: ['Python', 'pandas', 'matplotlib', 'Jupyter'] },
    { name: 'Desktop', skills: ['JavaFX'] },
    { name: 'How I work', skills: ['Agile', 'Scrum', 'Scrumban', 'Product ownership', 'UML', 'C4 model'] },
    { name: 'Tools', skills: ['Git', 'GitHub', 'Jira', 'IntelliJ', 'Rider', 'Power Automate', 'Microsoft 365'] },
    { name: 'Learning in spring 2027', skills: ['TypeScript', 'DevOps', 'Cloud'], learning: true },
  ],
};

/* ----------------------------- VOLUNTEERING ------------------------------ */
// photos: 5 slots per event at assets/volunteering/<folder>/01.jpg ... 05.jpg
// Fill alt (what is in the photo) and caption for each photo you add.
const shots = (folder) =>
  [1, 2, 3, 4, 5].map((n) => ({ src: `assets/volunteering/${folder}/0${n}.jpg`, alt: '', caption: '' }));

export const volunteering = [
  {
    ingredient: 'The egg',
    org: 'Operation Smile Inter-School Club Ecuador',
    role: 'Founder and President',
    dates: '2024 – 2025',
    points: [
      'Founded the club and led about 13 members',
      '10+ campaigns and $800+ raised',
      'Magee Award for most funds raised in Ecuador',
      'Scholarship to the Emory University ISLC',
    ],
    photos: shots('operation-smile'),
  },
  {
    ingredient: 'The nori',
    org: 'Tomas Moro Rotary Club',
    role: 'Image Director',
    dates: '2023 – 2024',
    points: ['Promoted 4+ community events', 'Organised an integration event for 30+ children'],
    photos: shots('rotary'),
  },
  {
    ingredient: 'The chashu',
    org: 'Programming 1 tutoring, VIA',
    role: 'Tutor',
    dates: 'Sep 2026 – present',
    points: ['18 first-semester students', 'Java and OOP workshops'],
    photos: shots('tutoring'),
  },
];

export const coupon = {
  title: 'Free ramen invite',
  line: 'Good for one bowl of ramen with Marina.',
  condition: 'Valid only if you hire me.',
  small: 'Internship Aug–Dec 2027 or student job · no expiry date · toppings negotiable',
  cta: 'Redeem',
};

/* ----------------------------- SOCIAL PROOF ------------------------------ */
// image: optional photo/certificate (personal data removed). Missing = text badge only.
export const proof = {
  badges: [
    { title: 'Official recognition', detail: 'Mexican Navy · JOKMAR oil-spill response exercise, 2026', image: 'assets/proof/navy-recognition.jpg', alt: '' },
    { title: 'Magee Award', detail: 'Operation Smile · most funds raised in Ecuador', image: 'assets/proof/magee-award.jpg', alt: '' },
    { title: 'Scholarship', detail: 'Emory University ISLC · Operation Smile', image: 'assets/proof/emory-islc.jpg', alt: '' },
    { title: 'Grade 12 × 3', detail: 'Database Systems · Software Engineering · Semester Project 2', image: 'assets/proof/grades.jpg', alt: '' },
    { title: 'Average 10.2', detail: 'Year 1 · 60/60 ECTS · Danish scale, 12 is the top', image: '', alt: '' },
    { title: 'Positive jury feedback', detail: 'ViaRooms · VIA 24-hour hackathon, Mar 2026', image: 'assets/proof/hackathon.jpg', alt: '' },
  ],
  // TODO: real quotes only. Leave text '' until you have one in writing.
  quotes: [
    { text: '', by: '' },
    { text: '', by: '' },
  ],
};

/* ------------------------------- ESPRESSO -------------------------------- */
// Cards appear while scroll progress is between `at` and `out` (0 = empty glass, 1 = full).
// pos: left-top, left-bottom, right-top, right-bottom.
export const espresso = {
  dir: 'assets/food/espresso', // frames f-000.webp ... made by tools/espresso.sh
  frames: 133,
  heading: 'One espresso. A few facts while it pours.',
  beats: [
    { at: 0.04, out: 0.36, pos: 'left-top', title: 'Studying', text: 'BSc Software Engineering, VIA University College, 2025–2029.' },
    { at: 0.16, out: 0.48, pos: 'right-bottom', title: 'Year 1', text: '60/60 ECTS. Average 10.2 on the Danish scale, where 12 is the top.' },
    { at: 0.4, out: 0.72, pos: 'left-bottom', title: 'I speak', text: 'English and Spanish (native), French (basic), Danish (learning).' },
    { at: 0.52, out: 0.84, pos: 'right-top', title: 'Learning next', text: 'TypeScript, DevOps and cloud, in spring 2027.' },
    { at: 0.78, out: 1.1, pos: 'left-top', title: 'Available', text: 'Internship Aug–Dec 2027. Student job, about 60 hours a month.' },
    { at: 0.86, out: 1.1, pos: 'right-bottom', title: '', text: 'I may set big goals, but I like to think I’ve proven to myself I can reach them.', hand: true },
  ],
};

/* -------------------------------- ABOUT ---------------------------------- */
export const about = {
  heading: 'And here is a little more of me.',
  quote: 'I want to learn, I’m ready to grow, I aim high, and with each step I reach my goal.',
  // 10 slots; fill alt text when you add a photo.
  photos: Array.from({ length: 10 }, (_, i) => ({
    src: `assets/about/${String(i + 1).padStart(2, '0')}.jpg`,
    alt: '',
  })),
  lists: [
    { title: 'Languages', items: ['English · native', 'Spanish · native', 'French · basic', 'Danish · learning'] },
    { title: 'Learning now', items: ['TypeScript', 'DevOps', 'Cloud'] },
    { title: 'Currently into', items: [] }, // TODO: e.g. a book, a show, a hobby. Hidden while empty.
    { title: 'Studying', items: ['VIA University College', 'Horsens, Denmark', 'BSc 2025–2029'] },
  ],
};

/* ------------------------------- HIRE ME --------------------------------- */
export const ending = {
  heading: 'Press any key to hire me.',
  sub: 'Every key works. The big one works best.',
  footer: 'No cookies, no tracking. Type “ramen” anywhere for a surprise.',
};

/* ---------------------- media list (used by the checker) ----------------- */
export function mediaSlots() {
  const s = [];
  const add = (path, ratio, type, what) => s.push({ path, ratio, type, what });
  add('assets/brand/social-preview.png', '1200x630', 'image', 'Link preview image');
  add('assets/brand/favicon.png', '512x512', 'image', 'Favicon');
  add(hero.portrait.src, '3:4, 1200x1600', 'image', 'Hero portrait in the arch frame');
  add(site.links.cv, 'PDF', 'document', 'Latest CV (required before launch)');
  for (const p of projects) {
    const d = `assets/projects/${p.slug}`;
    add(`${d}/cover.jpg`, '16:10, 1600x1000', 'image', `${p.title}: carousel cover`);
    add(`${d}/laptop.jpg`, '16:10, 1600x1000', 'image', `${p.title}: laptop screenshot`);
    if (p.phone) add(`${d}/phone-1.jpg`, '9:19.5, 1080x2340', 'image', `${p.title}: phone screenshot`);
    if (p.architecture) add(`${d}/architecture.svg`, 'free', 'diagram', `${p.title}: C4/architecture diagram`);
  }
  for (const v of volunteering) for (const ph of v.photos) add(ph.src, '3:4, 1200x1600', 'image', `${v.org}: gallery photo`);
  for (const b of proof.badges) if (b.image) add(b.image, '4:5, 1200x1500', 'image', `Proof: ${b.title}`);
  for (const ph of about.photos) add(ph.src, '3:4, 1200x1600', 'image', 'About collage photo');
  add(`${espresso.dir}/still.webp`, '16:9', 'frames', 'Espresso frame sequence (tools/espresso.sh)');
  return s;
}
