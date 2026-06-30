<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('site_contents', function (Blueprint $table): void {
            $table->id();
            $table->string('key')->unique();
            $table->string('content_type')->default('page');
            $table->string('navigation_group')->nullable();
            $table->string('navigation_label');
            $table->string('title');
            $table->string('image_path')->nullable();
            $table->longText('content');
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        $now = now();

        $records = [
            [
                'key' => 'home.hero',
                'content_type' => 'home',
                'navigation_group' => 'Beranda',
                'navigation_label' => 'Hero Carousel',
                'title' => 'Hero Carousel',
                'image_path' => 'seeded-assets/flyer-1.avif',
                'content' => <<<'HTML'
<h1>Science Competition Expo</h1>
<p>Daftar slide hero yang sedang digunakan pada halaman beranda.</p>
<ol>
    <li>Panitia SCE 2009 Beraudiensi dengan Dinas Pendidikan Sumatera Utara<br><img src="/seeded-assets/flyer-1.avif" alt="Flyer 1"></li>
    <li>Kepala Dinas Pendidikan Sumatera Utara Membuka Resmi SCE 2011<br><img src="/seeded-assets/flyer-2.avif" alt="Flyer 2"></li>
    <li>dr. Sofyan Tan, Komisi X DPR RI yang membidangi Pendidikan resmi membuka dan mendukung SCE 2015<br><img src="/seeded-assets/flyer-3.avif" alt="Flyer 3"></li>
    <li>Prof. Dr. Ir. Hj. Darmayanti Lubis Wakil Ketua DPD RI resmi membuka dan mendukung SCE 2016<br><img src="/seeded-assets/flyer-4.avif" alt="Flyer 4"></li>
    <li>Panglima Komando Cadangan Strategis Angkatan Darat (Pangkostrad) Letnan Jenderal Edy Rahmayadi membuka dan mendukung SCE 2016<br><img src="/seeded-assets/flyer-5.avif" alt="Flyer 5"></li>
    <li>Kecerian Para Siswa di SCE 2017<br><img src="/seeded-assets/flyer-5b.avif" alt="Flyer 5B"></li>
    <li>Dekan FMIPA USU &amp; Perwakilan Dinas Pendidikan Sumatera Utara Resmi Membuka SCE 2019<br><img src="/seeded-assets/flyer-6.avif" alt="Flyer 6"></li>
</ol>
HTML,
                'sort_order' => 10,
            ],
            [
                'key' => 'home.partner-notes',
                'content_type' => 'home',
                'navigation_group' => 'Beranda',
                'navigation_label' => 'Partner Notes',
                'title' => 'Partner Notes',
                'content' => <<<'HTML'
<h2>PT. Pelatos Nasional Indonesia</h2>
<p>Seluruh Soal Olimpiade Sains Dibuat dan Ditanggungjawabi Oleh: PT. Pelatos Nasional Indonesia (Pelatihan OSN), Kota Depok - Jawa Barat.</p>
<p><a href="https://pelatihan-osn.com/">View More</a></p>
<h2>English 1 Jakarta</h2>
<p>Seluruh Soal Olimpiade Bahasa Inggris Dibuat dan Ditanggungjawabi Oleh: English 1 Jakarta.</p>
<p><a href="https://www.britishcouncilfoundation.id/">View More</a></p>
HTML,
                'sort_order' => 20,
            ],
            [
                'key' => 'home.activities',
                'content_type' => 'home',
                'navigation_group' => 'Beranda',
                'navigation_label' => 'Kategori Kegiatan',
                'title' => 'Pilih Informasi Kegiatan',
                'content' => <<<'HTML'
<h2>Kategori Kegiatan</h2>
<ul>
    <li>Seminar Guru - Informasi seminar guru.</li>
    <li>Olimpiade Guru - Informasi olimpiade guru.</li>
    <li>LKTI Guru - Informasi lomba karya tulis ilmiah guru.</li>
    <li>Olimpiade Siswa SMA/MA/SMK - Informasi olimpiade siswa tingkat SMA/MA/SMK.</li>
    <li>Olimpiade Siswa SMP/MTs - Informasi olimpiade siswa tingkat SMP/MTs.</li>
    <li>Olimpiade Siswa SD/MI - Informasi olimpiade siswa tingkat SD/MI.</li>
</ul>
HTML,
                'sort_order' => 30,
            ],
            [
                'key' => 'page.sambutan-direktur-iostpi',
                'navigation_group' => 'Sambutan',
                'navigation_label' => 'Direktur IOSTPI',
                'title' => 'Sambutan Direktur IOSTPI',
                'content' => '<p>Sambutan Direktur IOSTPI</p>',
                'sort_order' => 110,
            ],
            [
                'key' => 'page.sambutan-ketua-fokal-usu',
                'navigation_group' => 'Sambutan',
                'navigation_label' => 'Ketua FOKAL USU',
                'title' => 'Sambutan Ketua Forum Komunikasi Antar Alumni (FOKAL) USU',
                'content' => '<p>Sambutan Ketua Forum Komunikasi Antar Alumni (FOKAL) USU</p>',
                'sort_order' => 120,
            ],
            [
                'key' => 'page.sambutan-ketua-panitia',
                'navigation_group' => 'Sambutan',
                'navigation_label' => 'Ketua Panitia',
                'title' => 'Sambutan Ketua Panitia',
                'content' => '<p>Sambutan Ketua Panitia</p>',
                'sort_order' => 130,
            ],
            [
                'key' => 'page.kompetisi-guru',
                'navigation_group' => 'Kompetisi Guru',
                'navigation_label' => 'Kompetisi Guru',
                'title' => 'Kompetisi Guru',
                'content' => '<p>Kompetisi Guru</p>',
                'sort_order' => 200,
            ],
            [
                'key' => 'page.lkti-guru',
                'navigation_group' => 'Kompetisi Guru',
                'navigation_label' => 'LKTI Guru',
                'title' => 'LKTI Guru',
                'image_path' => 'seeded-assets/20260604013659-dc74511b16b588fe.png',
                'content' => <<<'HTML'
<p>Lomba Karya Tulis Ilmiah (LKTI) Guru merupakan salah satu kegiatan dalam Pekan Ilmiah dan Olimpiade Sains (PIOS) yang dirancang sebagai ruang bagi guru untuk mengembangkan gagasan, pengalaman, dan inovasi pembelajaran dalam bentuk karya ilmiah. Kegiatan ini diharapkan dapat mendorong budaya menulis, meneliti, dan berbagi praktik baik di lingkungan pendidikan.</p>
<p>Melalui LKTI Guru, para pendidik diberi kesempatan untuk menuangkan pemikiran secara sistematis, kritis, dan solutif terhadap berbagai isu pendidikan, pembelajaran, maupun pengembangan potensi peserta didik. Karya tulis yang dihasilkan diharapkan tidak hanya menjadi dokumen akademik, tetapi juga dapat memberi inspirasi bagi peningkatan kualitas proses belajar mengajar.</p>
<p>Kegiatan ini terbuka bagi guru yang memiliki semangat untuk terus belajar, berinovasi, dan berkontribusi dalam dunia pendidikan. Dengan adanya LKTI Guru, PIOS berharap dapat menjadi wadah apresiasi bagi pendidik yang memiliki komitmen dalam membangun pendidikan yang lebih bermutu, kreatif, dan berkelanjutan.</p>
HTML,
                'sort_order' => 210,
            ],
            [
                'key' => 'page.seminar-guru',
                'navigation_group' => 'Kompetisi Guru',
                'navigation_label' => 'Seminar Guru',
                'title' => 'Seminar Guru',
                'image_path' => 'seeded-assets/20260604021608-3765d823e33835c5.png',
                'content' => <<<'HTML'
<p>Seminar Guru merupakan bagian dari rangkaian kegiatan Pekan Ilmiah dan Olimpiade Sains (PIOS) yang bertujuan untuk memperluas wawasan, meningkatkan kompetensi, dan memperkuat peran guru dalam menghadapi perkembangan dunia pendidikan. Kegiatan ini menjadi ruang pertemuan akademik bagi para pendidik untuk memperoleh informasi, inspirasi, serta pemahaman baru yang relevan dengan kebutuhan pembelajaran masa kini.</p>
<p>Melalui seminar ini, guru diharapkan dapat memperkaya perspektif mengenai strategi pembelajaran, pengembangan karakter peserta didik, pemanfaatan teknologi, serta peningkatan mutu pendidikan. Kegiatan ini juga menjadi kesempatan untuk membangun jejaring, berdiskusi, dan saling berbagi pengalaman antarpendidik dari berbagai daerah.</p>
<p>Seminar Guru dalam PIOS diselenggarakan sebagai bentuk dukungan terhadap peningkatan kualitas sumber daya manusia di bidang pendidikan. Dengan semangat belajar sepanjang hayat, guru diharapkan semakin siap menjadi pendamping, penggerak, dan inspirator bagi peserta didik dalam meraih prestasi dan membangun masa depan.</p>
HTML,
                'sort_order' => 220,
            ],
            [
                'key' => 'page.olimpiade-guru',
                'navigation_group' => 'Kompetisi Guru',
                'navigation_label' => 'Olimpiade Guru',
                'title' => 'Olimpiade Guru',
                'image_path' => 'seeded-assets/20260604023353-1b4904ab621443f8.png',
                'content' => <<<'HTML'
<p>Olimpiade Guru merupakan ajang kompetisi akademik yang diselenggarakan dalam rangka Pekan Ilmiah dan Olimpiade Sains (PIOS) untuk memberikan ruang bagi guru dalam mengukur, mengasah, dan menunjukkan kemampuan akademik serta profesionalnya. Kegiatan ini diharapkan dapat menumbuhkan semangat kompetisi yang sehat, sekaligus memperkuat budaya belajar di kalangan pendidik.</p>
<p>Melalui Olimpiade Guru, peserta dapat mengembangkan kemampuan berpikir kritis, analitis, dan reflektif dalam menjawab berbagai tantangan yang berkaitan dengan bidang keilmuan dan pendidikan. Kegiatan ini tidak hanya berorientasi pada hasil perlombaan, tetapi juga pada proses pembelajaran, peningkatan kapasitas diri, dan penguatan komitmen sebagai pendidik.</p>
<p>PIOS berharap Olimpiade Guru dapat menjadi sarana apresiasi bagi para guru yang terus berupaya meningkatkan kualitas diri. Dengan adanya kegiatan ini, guru diharapkan semakin termotivasi untuk menjadi teladan dalam belajar, berprestasi, dan memberikan kontribusi nyata bagi kemajuan pendidikan.</p>
HTML,
                'sort_order' => 230,
            ],
            [
                'key' => 'page.olimpiade-siswa-sma-ma-smk',
                'navigation_group' => 'Olimpiade Siswa',
                'navigation_label' => 'SMA/MA/SMK',
                'title' => 'Olimpiade Siswa SMA/MA/SMK',
                'content' => <<<'HTML'
<p>Olimpiade Siswa SMA/MA/SMK merupakan ajang kompetisi akademik dalam rangka Pekan Ilmiah dan Olimpiade Sains (PIOS) yang ditujukan bagi peserta didik tingkat menengah atas. Kegiatan ini menjadi ruang bagi siswa untuk mengembangkan kemampuan berpikir kritis, analitis, kreatif, dan sistematis dalam bidang ilmu pengetahuan.</p>
<p>Melalui olimpiade ini, peserta diharapkan dapat mengukur kemampuan akademik, memperluas wawasan, serta membangun semangat berkompetisi secara sehat. Kegiatan ini juga menjadi sarana untuk menumbuhkan rasa percaya diri, kedisiplinan, dan motivasi belajar yang lebih tinggi dalam menghadapi tantangan pendidikan.</p>
<p>PIOS berharap Olimpiade Siswa SMA/MA/SMK dapat menjadi wadah pengembangan potensi generasi muda yang unggul, berkarakter, dan siap berkontribusi bagi kemajuan ilmu pengetahuan. Setiap peserta diharapkan memperoleh pengalaman berharga yang dapat mendukung perjalanan akademik dan masa depannya.</p>
HTML,
                'sort_order' => 310,
            ],
            [
                'key' => 'page.olimpiade-siswa-smp-mts',
                'navigation_group' => 'Olimpiade Siswa',
                'navigation_label' => 'SMP/MTs',
                'title' => 'Olimpiade Siswa SMP/MTs',
                'content' => <<<'HTML'
<p>Olimpiade Siswa SMP/MTs merupakan kegiatan kompetisi akademik yang diselenggarakan untuk memberikan kesempatan kepada peserta didik tingkat menengah pertama dalam mengasah kemampuan berpikir, memahami konsep, dan menyelesaikan permasalahan secara logis. Kegiatan ini menjadi bagian dari upaya menumbuhkan minat belajar dan kecintaan terhadap ilmu pengetahuan sejak dini.</p>
<p>Melalui kegiatan ini, siswa didorong untuk berani mencoba, percaya diri, dan terbiasa menghadapi tantangan akademik dengan sikap positif. Olimpiade ini tidak hanya menilai hasil akhir, tetapi juga menjadi proses pembelajaran yang membantu peserta mengenali potensi diri dan meningkatkan kemampuan secara bertahap.</p>
<p>PIOS berharap Olimpiade Siswa SMP/MTs dapat menjadi pengalaman yang menyenangkan, mendidik, dan memotivasi peserta untuk terus belajar. Dengan semangat kompetisi yang sehat, kegiatan ini diharapkan mampu melahirkan peserta didik yang berprestasi, berkarakter, dan memiliki semangat untuk terus berkembang.</p>
HTML,
                'sort_order' => 320,
            ],
            [
                'key' => 'page.olimpiade-siswa-sd-mi',
                'navigation_group' => 'Olimpiade Siswa',
                'navigation_label' => 'SD/MI',
                'title' => 'Olimpiade Siswa SD/MI',
                'content' => <<<'HTML'
<p>Olimpiade Siswa SD/MI merupakan ajang pengembangan potensi akademik bagi peserta didik tingkat sekolah dasar. Kegiatan ini dirancang untuk menumbuhkan rasa ingin tahu, keberanian berpikir, dan semangat belajar melalui kompetisi yang edukatif, menyenangkan, dan sesuai dengan perkembangan usia peserta.</p>
<p>Melalui olimpiade ini, siswa diajak untuk mengenal tantangan akademik secara positif, melatih ketelitian, konsentrasi, serta kemampuan memahami dan menyelesaikan soal dengan baik. Kegiatan ini juga menjadi sarana untuk membangun rasa percaya diri dan membiasakan peserta didik agar berani menunjukkan kemampuan terbaiknya.</p>
<p>PIOS berharap Olimpiade Siswa SD/MI dapat menjadi langkah awal dalam membangun budaya belajar dan prestasi sejak dini. Setiap peserta diharapkan memperoleh pengalaman yang bermakna, menumbuhkan motivasi untuk terus belajar, serta menjadi pribadi yang tekun, jujur, dan bersemangat dalam meraih cita-cita.</p>
HTML,
                'sort_order' => 330,
            ],
            [
                'key' => 'page.prosedur-pendaftaran',
                'navigation_group' => 'Informasi',
                'navigation_label' => 'Prosedur Pendaftaran',
                'title' => 'Prosedur Pendaftaran',
                'content' => '<p>Prosedur Pendaftaran</p>',
                'sort_order' => 400,
            ],
            [
                'key' => 'page.kumpulan-soal',
                'navigation_group' => 'Informasi',
                'navigation_label' => 'Kumpulan Soal SCE',
                'title' => 'Kumpulan Soal SCE',
                'content' => '<p>Kumpulan Soal SCE</p>',
                'sort_order' => 410,
            ],
            [
                'key' => 'page.lokasi-ujian',
                'navigation_group' => 'Informasi',
                'navigation_label' => 'Lokasi Ujian & Rundown',
                'title' => 'Lokasi Ujian & Rundown Acara',
                'content' => '<p>Lokasi Ujian &amp; Rundown Acara</p>',
                'sort_order' => 420,
            ],
            [
                'key' => 'page.pengumuman',
                'navigation_group' => 'Informasi',
                'navigation_label' => 'Pengumuman',
                'title' => 'Pengumuman',
                'content' => '<p>Pengumuman</p>',
                'sort_order' => 430,
            ],
            [
                'key' => 'page.hasil-lomba',
                'navigation_group' => 'Informasi',
                'navigation_label' => 'Hasil Lomba',
                'title' => 'Hasil Lomba',
                'content' => '<p>Hasil Lomba</p>',
                'sort_order' => 440,
            ],
            [
                'key' => 'footer.contact',
                'content_type' => 'footer',
                'navigation_group' => 'Footer',
                'navigation_label' => 'Kontak Footer',
                'title' => 'Kontak Footer',
                'image_path' => 'seeded-assets/ika-fmipa.png',
                'content' => <<<'HTML'
<h2>Science Competition Expo</h2>
<h3>CP Panitia</h3>
<ul>
    <li>0813 6021 1850 (Tingkat SMA)</li>
    <li>0813 6021 1845 (Tingkat SMP)</li>
    <li>0853 8124 7216 (Tingkat SD)</li>
</ul>
<h3>Sekretariat Pendaftaran</h3>
<p>The Prime Residence Blok A No. 22-23 Jln. Setia Budi Ujung Simpang Selayang, Medan. (Dekat SPBU &amp; Pos Polisi Simpang Selayang)</p>
HTML,
                'sort_order' => 500,
            ],
            [
                'key' => 'footer.partners',
                'content_type' => 'footer',
                'navigation_group' => 'Footer',
                'navigation_label' => 'Partner Footer',
                'title' => 'Partner Footer',
                'image_path' => 'seeded-assets/usu.png',
                'content' => <<<'HTML'
<h3>Dewan Juri LKTI &amp; Seminar Guru Bekerjasama Dengan:</h3>
<ul>
    <li>Universitas Sumatera Utara</li>
    <li>Universitas Negeri Medan</li>
    <li>Institut Teknologi Bandung</li>
    <li>Pemerintah Kota Medan</li>
</ul>
<p><img src="/seeded-assets/usu.png" alt="Universitas Sumatera Utara"> <img src="/seeded-assets/unimed.png" alt="Universitas Negeri Medan"> <img src="/seeded-assets/itb-logo.png" alt="Institut Teknologi Bandung"> <img src="/seeded-assets/pemko-medan-logo.png" alt="Pemko Medan"></p>
HTML,
                'sort_order' => 510,
            ],
        ];

        DB::table('site_contents')->insert(array_map(
            fn (array $record): array => [
                ...$record,
                'content_type' => $record['content_type'] ?? 'page',
                'image_path' => $record['image_path'] ?? null,
                'is_active' => $record['is_active'] ?? true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            $records,
        ));
    }

    public function down(): void
    {
        Schema::dropIfExists('site_contents');
    }
};
