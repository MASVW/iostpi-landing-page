export const ASSET_ROOT = "/assets";

export const slides = [
  {
    filename: `${ASSET_ROOT}/flyer-1.avif`,
    judul:
      "Panitia SCE 2009 Beraudiensi dengan Dinas Pendidikan Sumatera Utara",
  },
  {
    filename: `${ASSET_ROOT}/flyer-2.avif`,
    judul: "Kepala Dinas Pendidikan Sumatera Utara Membuka Resmi SCE 2011",
  },
  {
    filename: `${ASSET_ROOT}/flyer-3.avif`,
    judul:
      "dr. Sofyan Tan, Komisi X DPR RI yang  membidangi Pendidikan resmi membuka dan mendukung SCE 2015",
  },
  {
    filename: `${ASSET_ROOT}/flyer-4.avif`,
    judul:
      "Prof. Dr. Ir. Hj. Darmayanti Lubis Wakil Ketua DPD RI resmi membuka dan mendukung SCE 2016",
  },
  {
    filename: `${ASSET_ROOT}/flyer-5.avif`,
    judul:
      "Panglima Komando Cadangan Strategis Angkatan Darat (Pangkostrad) Letnan Jenderal Edy Rahmayadi membuka dan mendukung SCE 2016",
  },
  {
    filename: `${ASSET_ROOT}/flyer-2.avif`,
    judul: "Kecerian Para Siswa di SCE 2017",
  },
  {
    filename: `${ASSET_ROOT}/flyer-6.avif`,
    judul:
      "Dekan FMIPA USU & Perwakilan Dinas Pendidikan Sumatera Utara Resmi Membuka SCE 2019",
  },
];

export const mainRelated = [
  { label: "Sambutan", path: "/page/sambutan" },
  { label: "Kompetisi Guru", path: "/page/kompetisi-guru" },
  { label: "Olimpiade Siswa", path: "/page/olimpiade-siswa" },
  { label: "Prosedur Pendaftaran", path: "/page/prosedur-pendaftaran" },
  { label: "Hasil Lomba", path: "/page/hasil-lomba" },
];

export const sambutanRelated = [
  { label: "Sambutan Direktur IOSTPI", path: "/page/sambutan-direktur-iostpi" },
  { label: "Sambutan Dekan FMIPA USU", path: "/page/sambutan-dekan-fmipa-usu" },
  {
    label: "Sambutan Ketua IKA FMIPA USU Deli Serdang",
    path: "/page/sambutan-ketua-ika-fmipa-usu-deli-serdang",
  },
  { label: "Sambutan Panitia", path: "/page/sambutan-panitia" },
];

export const teacherRelated = [
  { label: "LKTI Guru", path: "/page/lkti-guru" },
  { label: "Seminar Guru", path: "/page/seminar-guru" },
  { label: "Olimpiade Guru", path: "/page/olimpiade-guru" },
];

export const studentRelated = [
  {
    label: "Olimpiade Siswa SMA/MA/SMK",
    path: "/page/olimpiade-siswa-sma-ma-smk",
  },
  { label: "Olimpiade Siswa SMP/MTs", path: "/page/olimpiade-siswa-smp-mts" },
  { label: "Olimpiade Siswa SD/MI", path: "/page/olimpiade-siswa-sd-mi" },
];

export const contentPages = {
  sambutan: {
    title: "Sambutan",
    image: `${ASSET_ROOT}/20260604012432-c7d7530b1563ca1d.png`,
    related: mainRelated,
    paragraphs: [
      "Selamat datang di website resmi Pekan Ilmiah dan Olimpiade Sains (PIOS). Kegiatan ini hadir sebagai ruang pengembangan potensi, kreativitas, dan prestasi bagi peserta didik serta guru dalam bidang ilmu pengetahuan, penelitian, dan kompetisi akademik. Melalui PIOS, diharapkan semangat belajar, berpikir kritis, berinovasi, dan berkompetisi secara sehat dapat terus tumbuh di lingkungan pendidikan.",
      "PIOS tidak hanya menjadi ajang perlombaan, tetapi juga wadah untuk memperluas wawasan, membangun kepercayaan diri, serta menumbuhkan budaya ilmiah di kalangan pelajar dan pendidik. Setiap peserta diharapkan dapat menjadikan kegiatan ini sebagai pengalaman berharga untuk mengasah kemampuan, memperkuat karakter, dan meningkatkan daya saing di era perkembangan ilmu pengetahuan dan teknologi.",
      "Kami mengucapkan terima kasih kepada seluruh pihak yang telah memberikan dukungan dalam penyelenggaraan kegiatan ini. Semoga PIOS dapat berjalan dengan baik, memberi manfaat yang luas, dan menjadi bagian dari upaya bersama dalam mendorong lahirnya generasi yang unggul, berprestasi, dan berintegritas.",
    ],
  },
  "kompetisi-guru": {
    title: "Kompetisi Guru",
    related: teacherRelated,
    paragraphs: ["Kompetisi Guru"],
  },
  "lkti-guru": {
    title: "LKTI Guru",
    image: `${ASSET_ROOT}/20260604013659-dc74511b16b588fe.png`,
    related: teacherRelated,
    paragraphs: [
      "Lomba Karya Tulis Ilmiah (LKTI) Guru merupakan salah satu kegiatan dalam Pekan Ilmiah dan Olimpiade Sains (PIOS) yang dirancang sebagai ruang bagi guru untuk mengembangkan gagasan, pengalaman, dan inovasi pembelajaran dalam bentuk karya ilmiah. Kegiatan ini diharapkan dapat mendorong budaya menulis, meneliti, dan berbagi praktik baik di lingkungan pendidikan.",
      "Melalui LKTI Guru, para pendidik diberi kesempatan untuk menuangkan pemikiran secara sistematis, kritis, dan solutif terhadap berbagai isu pendidikan, pembelajaran, maupun pengembangan potensi peserta didik. Karya tulis yang dihasilkan diharapkan tidak hanya menjadi dokumen akademik, tetapi juga dapat memberi inspirasi bagi peningkatan kualitas proses belajar mengajar.",
      "Kegiatan ini terbuka bagi guru yang memiliki semangat untuk terus belajar, berinovasi, dan berkontribusi dalam dunia pendidikan. Dengan adanya LKTI Guru, PIOS berharap dapat menjadi wadah apresiasi bagi pendidik yang memiliki komitmen dalam membangun pendidikan yang lebih bermutu, kreatif, dan berkelanjutan.",
    ],
  },
  "seminar-guru": {
    title: "Seminar Guru",
    image: `${ASSET_ROOT}/20260604021608-3765d823e33835c5.png`,
    related: teacherRelated,
    paragraphs: [
      "Seminar Guru merupakan bagian dari rangkaian kegiatan Pekan Ilmiah dan Olimpiade Sains (PIOS) yang bertujuan untuk memperluas wawasan, meningkatkan kompetensi, dan memperkuat peran guru dalam menghadapi perkembangan dunia pendidikan. Kegiatan ini menjadi ruang pertemuan akademik bagi para pendidik untuk memperoleh informasi, inspirasi, serta pemahaman baru yang relevan dengan kebutuhan pembelajaran masa kini.",
      "Melalui seminar ini, guru diharapkan dapat memperkaya perspektif mengenai strategi pembelajaran, pengembangan karakter peserta didik, pemanfaatan teknologi, serta peningkatan mutu pendidikan. Kegiatan ini juga menjadi kesempatan untuk membangun jejaring, berdiskusi, dan saling berbagi pengalaman antarpendidik dari berbagai daerah.",
      "Seminar Guru dalam PIOS diselenggarakan sebagai bentuk dukungan terhadap peningkatan kualitas sumber daya manusia di bidang pendidikan. Dengan semangat belajar sepanjang hayat, guru diharapkan semakin siap menjadi pendamping, penggerak, dan inspirator bagi peserta didik dalam meraih prestasi dan membangun masa depan.",
    ],
  },
  "olimpiade-guru": {
    title: "Olimpiade Guru",
    image: `${ASSET_ROOT}/20260604023353-1b4904ab621443f8.png`,
    related: teacherRelated,
    paragraphs: [
      "Olimpiade Guru merupakan ajang kompetisi akademik yang diselenggarakan dalam rangka Pekan Ilmiah dan Olimpiade Sains (PIOS) untuk memberikan ruang bagi guru dalam mengukur, mengasah, dan menunjukkan kemampuan akademik serta profesionalnya. Kegiatan ini diharapkan dapat menumbuhkan semangat kompetisi yang sehat, sekaligus memperkuat budaya belajar di kalangan pendidik.",
      "Melalui Olimpiade Guru, peserta dapat mengembangkan kemampuan berpikir kritis, analitis, dan reflektif dalam menjawab berbagai tantangan yang berkaitan dengan bidang keilmuan dan pendidikan. Kegiatan ini tidak hanya berorientasi pada hasil perlombaan, tetapi juga pada proses pembelajaran, peningkatan kapasitas diri, dan penguatan komitmen sebagai pendidik.",
      "PIOS berharap Olimpiade Guru dapat menjadi sarana apresiasi bagi para guru yang terus berupaya meningkatkan kualitas diri. Dengan adanya kegiatan ini, guru diharapkan semakin termotivasi untuk menjadi teladan dalam belajar, berprestasi, dan memberikan kontribusi nyata bagi kemajuan pendidikan.",
    ],
  },
  "olimpiade-siswa": {
    title: "Olimpiade Siswa",
    related: studentRelated,
    paragraphs: ["Olimpiade Siswa"],
  },
  "olimpiade-siswa-sma-ma-smk": {
    title: "Olimpiade Siswa SMA/MA/SMK",
    related: studentRelated,
    paragraphs: [
      "Olimpiade Siswa SMA/MA/SMK merupakan ajang kompetisi akademik dalam rangka Pekan Ilmiah dan Olimpiade Sains (PIOS) yang ditujukan bagi peserta didik tingkat menengah atas. Kegiatan ini menjadi ruang bagi siswa untuk mengembangkan kemampuan berpikir kritis, analitis, kreatif, dan sistematis dalam bidang ilmu pengetahuan.",
      "Melalui olimpiade ini, peserta diharapkan dapat mengukur kemampuan akademik, memperluas wawasan, serta membangun semangat berkompetisi secara sehat. Kegiatan ini juga menjadi sarana untuk menumbuhkan rasa percaya diri, kedisiplinan, dan motivasi belajar yang lebih tinggi dalam menghadapi tantangan pendidikan.",
      "PIOS berharap Olimpiade Siswa SMA/MA/SMK dapat menjadi wadah pengembangan potensi generasi muda yang unggul, berkarakter, dan siap berkontribusi bagi kemajuan ilmu pengetahuan. Setiap peserta diharapkan memperoleh pengalaman berharga yang dapat mendukung perjalanan akademik dan masa depannya.",
    ],
  },
  "olimpiade-siswa-smp-mts": {
    title: "Olimpiade Siswa SMP/MTs",
    related: studentRelated,
    paragraphs: [
      "Olimpiade Siswa SMP/MTs merupakan kegiatan kompetisi akademik yang diselenggarakan untuk memberikan kesempatan kepada peserta didik tingkat menengah pertama dalam mengasah kemampuan berpikir, memahami konsep, dan menyelesaikan permasalahan secara logis. Kegiatan ini menjadi bagian dari upaya menumbuhkan minat belajar dan kecintaan terhadap ilmu pengetahuan sejak dini.",
      "Melalui kegiatan ini, siswa didorong untuk berani mencoba, percaya diri, dan terbiasa menghadapi tantangan akademik dengan sikap positif. Olimpiade ini tidak hanya menilai hasil akhir, tetapi juga menjadi proses pembelajaran yang membantu peserta mengenali potensi diri dan meningkatkan kemampuan secara bertahap.",
      "PIOS berharap Olimpiade Siswa SMP/MTs dapat menjadi pengalaman yang menyenangkan, mendidik, dan memotivasi peserta untuk terus belajar. Dengan semangat kompetisi yang sehat, kegiatan ini diharapkan mampu melahirkan peserta didik yang berprestasi, berkarakter, dan memiliki semangat untuk terus berkembang.",
    ],
  },
  "olimpiade-siswa-sd-mi": {
    title: "Olimpiade Siswa SD/MI",
    related: studentRelated,
    paragraphs: [
      "Olimpiade Siswa SD/MI merupakan ajang pengembangan potensi akademik bagi peserta didik tingkat sekolah dasar. Kegiatan ini dirancang untuk menumbuhkan rasa ingin tahu, keberanian berpikir, dan semangat belajar melalui kompetisi yang edukatif, menyenangkan, dan sesuai dengan perkembangan usia peserta.",
      "Melalui olimpiade ini, siswa diajak untuk mengenal tantangan akademik secara positif, melatih ketelitian, konsentrasi, serta kemampuan memahami dan menyelesaikan soal dengan baik. Kegiatan ini juga menjadi sarana untuk membangun rasa percaya diri dan membiasakan peserta didik agar berani menunjukkan kemampuan terbaiknya.",
      "PIOS berharap Olimpiade Siswa SD/MI dapat menjadi langkah awal dalam membangun budaya belajar dan prestasi sejak dini. Setiap peserta diharapkan memperoleh pengalaman yang bermakna, menumbuhkan motivasi untuk terus belajar, serta menjadi pribadi yang tekun, jujur, dan bersemangat dalam meraih cita-cita.",
    ],
  },
  "prosedur-pendaftaran": {
    title: "Prosedur Pendaftaran",
    related: mainRelated,
    paragraphs: ["Prosedur Pendaftaran"],
  },
  "hasil-lomba": {
    title: "Hasil Lomba",
    related: mainRelated,
    paragraphs: ["Hasil Lomba"],
  },
};

export const announcements = [
  {
    slug: "pengumuman-ketiga",
    title: "Pengumuman Ketiga",
    date: "03 Jun 2026",
    published: "Rabu, 03 Juni 2026 pukul 23:05 WIB",
    viewers: 4,
    image: `${ASSET_ROOT}/20260603230544-bb55eccfc642aa38.png`,
  },
  {
    slug: "pengumuman-kedua",
    title: "Pengumuman Kedua",
    date: "03 Jun 2026",
    published: "Rabu, 03 Juni 2026 pukul 22:57 WIB",
    viewers: 8,
    image: `${ASSET_ROOT}/20260603225755-1da1b1698ed70111.png`,
  },
  {
    slug: "pengumuman-pertama",
    title: "Pengumuman Pertama",
    date: "03 Jun 2026",
    published: "Rabu, 03 Juni 2026 pukul 22:36 WIB",
    viewers: 25,
    image: `${ASSET_ROOT}/20260603224211-22d31f8087f49d0c.png`,
  },
];

const loremSections = [
  {
    heading: "What is Lorem Ipsum?",
    paragraphs: [
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software including versions of Lorem Ipsum.",
    ],
  },
  {
    heading: "Why do we use it?",
    paragraphs: [
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    ],
  },
  {
    heading: "Where does it come from?",
    paragraphs: [
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
      'The standard chunk of Lorem Ipsum used since 1966 is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
    ],
  },
  {
    heading: "Where can I get some?",
    paragraphs: [
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    ],
  },
];

export const announcementArticles = {
  "pengumuman-pertama": loremSections,
  "pengumuman-kedua": loremSections,
  "pengumuman-ketiga": [
    {
      paragraphs: [
        "evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      ],
    },
    loremSections[2],
    loremSections[3],
  ],
};
