/* =====================================================================
   PORTFOLIO CONFIG — the ONLY file you need to edit for content.
   • Reorder items by reordering them in their list.
   • Delete an item (or a whole list's contents) to remove it from the site.
   • An empty list hides its whole section automatically.
   • Any field left as '' is simply not shown.
   • Images/PDFs go in /assets and /resume (paths are relative to index.html).
   ===================================================================== */
window.portfolioConfig = {

  site: {
    brand: 'ORBITAL',                                   // top-left logo text
    title: 'Girinath NU — Portfolio',
    description: 'Portfolio of Girinath NU, B.Tech ECE student at SASTRA University exploring RF systems, satellite communication, radar imaging, SDR and embedded technologies.',
    footer: '© 2026 GIRINATH NU · ORBITAL · SASTRA UNIVERSITY'
  },

  personal: {
    name: 'Girinath NU',
    initials: 'GNU',                                    // shown if the profile photo is missing
    tagline: 'ENGINEERING SIGNALS. EXPLORING BEYOND BOUNDARIES.',
    intro: 'Electronics and Communication Engineering enthusiast exploring RF systems, satellite communication, radar imaging, SDR and embedded technologies.',
    email: '127004076@sastra.ac.in',
    phone: '+91-9123566533',
    location: '',
    profileImage: 'assets/profile/profile.jpg',         // replace this file to change the photo
    profileAlt: 'Portrait of Girinath NU'
  },

  // Full URLs. Empty ones are hidden. You can add any key (e.g. twitter: 'https://…').
  socialLinks: {
    linkedin: 'https://linkedin.com/in/girinath-nu',
    github: 'https://github.com/Girinath-NU',
    leetcode: '',
    portfolio: ''
  },

  resume: {
    file: 'resume/resume.pdf',                          // replace the PDF in /resume (keep name) OR change this path
    fileName: 'Girinath_NU_Resume.pdf',                 // name the visitor's download gets
    lastUpdated: '',                                    // e.g. '2026-11' — also busts browser cache
    showViewButton: false                               // true adds a "View Resume" button (opens PDF in new tab)
  },

  hero: {
    eyebrow: 'Mission Control · Operator',
    hudTop: 'TRANSMISSION ACTIVE | EARTH ORBIT',
    missionClass: 'MISSION CLASS: RF / SATCOM',
    signalStatus: 'SIGNAL STATUS: ACTIVE',
    buttons: { missions: 'Explore Missions', contact: 'Establish Connection', resume: 'Download Resume', viewResume: 'View Resume' }
  },

  // Section on/off + optional renamed headings. Keys: about, missions, expertise, research, leadership, education, contact
  // Example: missions: { enabled: true, nav: 'Projects', eyebrow: 'Featured Missions', title: 'Five Engineering Missions', cardLabel: 'Mission' }
  sections: {
    about:      { enabled: true, nav: 'About',      eyebrow: 'Personnel Identification', title: 'The Engineer Behind the Signal' },
    missions:   { enabled: true, nav: 'Missions',   eyebrow: 'Featured Missions',        title: 'Five Engineering Missions', cardLabel: 'Mission' },
    expertise:  { enabled: true, nav: 'Expertise',  eyebrow: 'Technical Expertise',      title: 'RF Engineering Dashboard' },
    research:   { enabled: true, nav: 'Research',   eyebrow: 'Research Experience',      title: 'RF Research Laboratory' },
    leadership: { enabled: true, nav: 'Leadership', eyebrow: 'Leadership & Community',   title: 'Orbital Network' },
    education:  { enabled: true, nav: 'Education',  eyebrow: 'Education & Certifications', title: 'Mission Timeline' },
    contact:    { enabled: true, nav: 'Contact',    eyebrow: 'Establish Communication' }
  },

  about: {
    idLine: 'ID · GIRINATH NU · STATUS: ACTIVE',
    summary: 'ECE engineer passionate about RF engineering, satellite systems, signal processing and aerospace technologies — working across SDR, radar imaging, satellite tracking, GNSS and embedded platforms.',
    details: [
      { label: 'DEGREE',     value: 'B.Tech ECE (Hons)' },
      { label: 'UNIVERSITY', value: 'SASTRA University, Thanjavur' },
      { label: 'MINOR',      value: 'Innovation and Entrepreneurship' },
      { label: 'GRADUATION', value: 'May 2027 (expected)' }
    ]
  },

  /* ---------------- PROJECTS ----------------
     visual (animated preview when no image): 'packets' | 'sar' | 'imu' | 'phase' | 'gnss' | 'scope'
     image: 'assets/projects/my-project.png' → shown instead of the animation (falls back to animation if missing)
     featured: true → ★ marker and sorted first when featuredFirst is true                                    */
  projectsOptions: { featuredFirst: false },
  projects: [
       {
      title: 'Satellite Tracking Using Phase Interferometry',
      description: '', category: 'SATCOM', year: '', featured: false,
      visual: 'phase', image: '', github: '', demo: '',
      tags: ['Keysight EMPro', 'GNU Radio', 'Phase Interferometry', 'Phased Array', 'AoA', 'Doppler Estimation'],
      objective: 'Passive satellite tracking using an SDR receiver.',
      approach: 'An SDR-based phase interferometric receiver using angle-of-arrival (AoA) and Doppler estimation.',
      concepts: ['Phase interferometry', 'Phased array', 'Angle of arrival', 'Doppler estimation'],
      work: 'Developed an SDR-based phase interferometric receiver for passive satellite tracking using AoA and Doppler estimation, with Keysight EMPro and GNU Radio.'
    },
    {
      title: 'AX.25-Based Telemetry Communication System',
      description: '', category: 'SATCOM', year: '', featured: false,
      visual: 'packets', image: '', github: '', demo: '',
      tags: ['GNU Radio', 'Ettus USRP SDR', 'Python', 'Direwolf', 'Linux', 'AFSK', 'NRZI', 'CRC'],
      objective: 'Reliable SDR-based satellite telemetry transmission.',
      approach: 'An AX.25 telemetry communication system built around AFSK modulation, NRZI encoding and CRC validation.',
      concepts: ['AX.25 packet framing', 'AFSK modulation', 'NRZI line encoding', 'CRC error detection'],
      work: 'Designed and implemented the AX.25 telemetry communication system using GNU Radio, an Ettus USRP SDR, Python, Direwolf and Linux.'
    },
    {
      title: 'Synthetic Aperture Radar (SAR) Imaging using SDR',
      description: '', category: 'Radar', year: '', featured: false,
      visual: 'sar', image: '', github: '', demo: '',
      tags: ['GNU Radio', 'Python', 'USRP B210', 'SFCW Radar', 'SAR Imaging', 'Signal Processing'],
      objective: 'Target imaging with an SDR-based synthetic aperture radar.',
      approach: 'An SFCW (stepped-frequency continuous-wave) SAR system on a USRP B210, covering signal acquisition and image reconstruction.',
      concepts: ['SFCW radar', 'Synthetic aperture imaging', 'Signal processing'],
      work: 'Developed the SDR-based SFCW SAR system and implemented signal acquisition and image reconstruction for target imaging.'
    },
    {
      title: 'Real-Time IMU-Based 3D Orientation Tracking',
      description: '', category: 'Embedded', year: '', featured: false,
      visual: 'imu', image: '', github: '', demo: '',
      tags: ['ESP32', 'MPU6050', 'WebSockets', 'HTML', 'CSS', 'JavaScript'],
      objective: 'Visualize a 3D object’s orientation live from IMU data.',
      approach: '6-axis IMU data from an MPU6050 is streamed wirelessly from an ESP32 to a web application over WebSockets.',
      concepts: ['6-axis inertial sensing', 'Wireless telemetry streaming', 'Real-time 3D visualization'],
      work: 'Developed a real-time web application that visualizes a 3D object’s orientation using 6-axis IMU data streamed wirelessly from an ESP32.'
    },
    {
      title: 'GNSS L1 Signal Generation and Transmitter Design',
      description: '', category: 'GNSS', year: '', featured: false,
      visual: 'gnss', image: '', github: '', demo: '',
      tags: ['Keysight SystemVue', 'Signal Generator', 'Signal Analyser', 'GNSS', 'L1 Signal'],
      objective: 'Generate and analyze GNSS L1 signals.',
      approach: 'A GNSS L1 transmitter architecture in Keysight SystemVue; signals are transmitted using a signal generator and analysed with a signal analyser.',
      concepts: ['GNSS signal structure', 'L1 signal generation', 'Transmitter architecture'],
      work: 'Developed the GNSS L1 transmitter architecture in Keysight SystemVue for generating and analyzing GNSS signals.'
    }
    /* ADD A NEW PROJECT: copy one block above, add a comma, edit the fields. Optional: details: 'longer write-up' */
  ],

  // icon: 0 = waveform, 1 = chip, 2 = antenna
  skills: [
    { category: 'Laboratory & Test Equipment', icon: 0, items: ['DSO', 'Signal Generator', 'Vector Network Analyzer', 'Signal Analyzers', 'Software Defined Radio'] },
    { category: 'Simulation & Design',         icon: 1, items: ['ADS', 'CST', 'SystemVue', 'Multisim', 'Arduino IDE', 'Altium', 'GNU Radio'] },
    { category: 'Embedded Systems',            icon: 2, items: ['ESP32', 'Arduino', 'Raspberry Pi Pico', 'ATmega328P'] }
  ],

  experience: [
    {
      role: 'Student Researcher',
      org: 'SASTRA Keysight Centre of Excellence in RF System Engineering',
      period: '2024 – Present',
      summary: 'Learned simulation software and gained hands-on experience with laboratory equipment — DSO, signal generator, vector network analyzer, signal analyzers and SDR — alongside ADS, CST and SystemVue.',
      tags: ['ADS', 'CST', 'SystemVue', 'Altium', 'VNA', 'DSO']
    }
  ],

  // Leadership roles shown as nodes in the orbital network
  positions: [
    { role: 'President',           org: 'Stellaria · Astronomy Club',  period: '2026–Now' },
    { role: 'Vice Chairperson',    org: 'IEEE AP-S Student Branch',    period: '2026–Now' },
    { role: 'Project Coordinator', org: 'Electronics Club',            period: '2025–2026' },
    { role: 'Contributor',         org: 'Minnanuvial Boys',            period: 'student-led electronics initiative' }
  ],

  achievements: [
    // { title: 'Award name', description: 'What it was for', year: '2026' }
  ],

  education: [
    { period: 'May 2027 (expected)', title: 'B.Tech ECE (Hons)',  institute: 'SASTRA University, Thanjavur', details: 'CGPA 7.8897 · Minor in Innovation and Entrepreneurship' },
    { period: 'April 2023',          title: 'Senior Secondary',   institute: 'Velammal Mat. Hr. Sec. School', details: '89%' },
    { period: 'April 2021',          title: 'Secondary',          institute: 'Bharathidhasanar Mat. Hr. Sec. School', details: '' }
  ],

  certifications: [
    { date: 'June 2025', title: 'Fundamentals of EMC and Requirements for Pre-Compliance Testing', note: 'Certification', link: '' },
    { date: 'May 2024',  title: 'Diploma Certification in Electronics Mastery',                    note: 'Certification', link: '' }
  ],

  services: [
    // { title: 'RF design consulting', description: '…' }   (renders an extra "Services" block under Expertise when filled)
  ],

  contact: {
    heading: 'READY TO ESTABLISH CONNECTION?',
    text: "Have an interesting research opportunity, collaboration, or an idea worth exploring? Let's connect.",
    formEndpoint: '/api/contact',                       // serverless Resend endpoint (see README)
    submitLabel: 'Transmit Message'
  }
};
