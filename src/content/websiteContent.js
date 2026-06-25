// File pusat pengisian konten website.
// Pemilik website cukup mengubah data di file ini untuk memperbarui:
// - slide hero,
// - menu terkait,
// - isi halaman,
// - file unduhan halaman.
//
// Catatan:
// - Simpan gambar/file publik di folder public/assets.
// - Di file ini, tulis path file sebagai `${ASSET_ROOT}/nama-file.ext`.
// - Setelah mengubah konten, jalankan `npm run build`, lalu upload isi folder dist ke cPanel.
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
    filename: `${ASSET_ROOT}/flyer-5b.avif`,
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
  { label: "Kumpulan Soal SCE", path: "/page/kumpulan-soal" },
  { label: "Lokasi Ujian & Rundown Acara", path: "/page/lokasi-ujian" },
];

export const sambutanRelated = [
  { label: "Sambutan Direktur IOSTPI", path: "/page/sambutan-direktur-iostpi" },
  {
    label: "Sambutan Ketua Forum Komunikasi Antar Alumni (FOKAL) USU",
    path: "/page/sambutan-ketua-fokal-usu",
  },
  { label: "Sambutan Ketua Panitia", path: "/page/sambutan-ketua-panitia" },
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

// Untuk menampilkan file unduhan di sebuah halaman, tambahkan properti:
// files: [{ label: "Nama Tombol", filename: "nama-file.pdf" }],
// File fisiknya disimpan di public/assets/nama-file.pdf.
export const contentPages = {
  sambutan: {
    title: "Sambutan",
    image: `${ASSET_ROOT}/20260604012432-c7d7530b1563ca1d.png`,
    related: sambutanRelated,
    paragraphs: [
      "Selamat datang di website resmi Pekan Ilmiah dan Olimpiade Sains (PIOS). Kegiatan ini hadir sebagai ruang pengembangan potensi, kreativitas, dan prestasi bagi peserta didik serta guru dalam bidang ilmu pengetahuan, penelitian, dan kompetisi akademik. Melalui PIOS, diharapkan semangat belajar, berpikir kritis, berinovasi, dan berkompetisi secara sehat dapat terus tumbuh di lingkungan pendidikan.",
      "PIOS tidak hanya menjadi ajang perlombaan, tetapi juga wadah untuk memperluas wawasan, membangun kepercayaan diri, serta menumbuhkan budaya ilmiah di kalangan pelajar dan pendidik. Setiap peserta diharapkan dapat menjadikan kegiatan ini sebagai pengalaman berharga untuk mengasah kemampuan, memperkuat karakter, dan meningkatkan daya saing di era perkembangan ilmu pengetahuan dan teknologi.",
      "Kami mengucapkan terima kasih kepada seluruh pihak yang telah memberikan dukungan dalam penyelenggaraan kegiatan ini. Semoga PIOS dapat berjalan dengan baik, memberi manfaat yang luas, dan menjadi bagian dari upaya bersama dalam mendorong lahirnya generasi yang unggul, berprestasi, dan berintegritas.",
    ],
  },
  "sambutan-direktur-iostpi": {
    title: "Sambutan Direktur IOSTPI",
    related: sambutanRelated,
    paragraphs: ["Sambutan Direktur IOSTPI"],
  },
  "sambutan-ketua-fokal-usu": {
    title: "Sambutan Ketua Forum Komunikasi Antar Alumni (FOKAL) USU",
    related: sambutanRelated,
    paragraphs: ["Sambutan Ketua Forum Komunikasi Antar Alumni (FOKAL) USU"],
  },
  "sambutan-ketua-panitia": {
    title: "Sambutan Ketua Panitia",
    related: sambutanRelated,
    paragraphs: ["Sambutan Ketua Panitia"],
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
    paragraphs: [
      "Sehubungan Website Sedang dalam Penyempurnaan, maka khusus untuk Prosedur & Panduan Pendaftaran Olimpiade SCE 2026 dapat didownload pada Link Berikut:",
      "",
      "Surat Undangan Resmi dan Seluruh File pada link tersebut akan diterima oleh seluruh sekolah SD/MI, SMP/MTs, SMA/MA/SMK se Sumatera Bagian Utara yang akan disampaikan oleh PT. POS Indonesia dalam bentuk Print Out pada tanggal 15 Juli 2026. Seluruh file tersebut penggunaannya adalah terhitung sejak 15 Juli 2026, namun panitia sengaja mempublikasikannya sejak dini untuk dapat digunakan sebagai referensi bagi para Kepala Sekolah dan Guru Pendamping atau Guru Pelatih/Pembina Olimpiade mempersiapkan para tim dari sekolah masing-masing.",
    ],
  },
  "kumpulan-soal": {
    title: "Kumpulan Soal SCE",
    related: mainRelated,
    paragraphs: ["Kumpulan Soal SCE"],
  },
  "lokasi-ujian": {
    title: "Lokasi Ujian & Rundown Acara",
    related: mainRelated,
    paragraphs: ["Lokasi Ujian & Rundown Acara"],
  },
  "hasil-lomba": {
    title: "Hasil Lomba",
    related: mainRelated,
    paragraphs: ["Hasil Lomba"],
  },
};
