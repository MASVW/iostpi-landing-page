import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = new URL(".", import.meta.url).pathname;
const reportDate = "2026-06-25";
const sourceQuery =
  "in:anywhere from:noreply.livin@bankmandiri.co.id after:2026/3/1 before:2026/6/26";

const rawTsv = `date	time	subject	merchant	base	fee	total	status	id	note
2026-03-02	16:33:34	Pembayaran Berhasil!	PT Tokopedia Jakarta Selatan	189084	0	189084	Berhasil	19cade58fd2a4a89	QRIS
2026-03-02	16:35:23	Top-up Berhasil	GoPay Customer ****9604	2000000	1000	2001000	Berhasil	19cade7230f805a4	Top-up
2026-03-02	16:39:13	Transfer dengan BI Fast Berhasil	JOICE MELATI H - Bank Negara Indonesia	232000	2500	234500	Berhasil	19cadeaae603008e	Tujuan transaksi: pembelian
2026-03-02	16:42:19	Top-up Berhasil	GoPay Customer ****9604	700000	1000	701000	Berhasil	19caded7b00f0499	Top-up
2026-03-02	17:21:30	Transfer dengan BI Fast Berhasil	SAMUEL ZAKARIA H - Bank Central Asia	50000	2500	52500	Berhasil	19cae116a76fe060	Transfer ke rekening sendiri
2026-03-03	12:52:49	Transfer Berhasil	OLIB FELIX ANDIKA AR	30000	0	30000	Berhasil	19cb24201c40af14	Transfer QR
2026-03-03	18:35:55	Pembayaran Berhasil!	ALGO MEDAN - QRIS	26900	0	26900	Berhasil	19cb37bd41e62cfe	QRIS
2026-03-04	11:20:03	Transfer Berhasil	JESSICA EVANGELI	40000	0	40000	Berhasil	19cb713261868aaf	Transfer
2026-03-04	14:48:47	Transfer Berhasil	JESSICA EVANGELI	16500	0	16500	Berhasil	19cb7d2420a21aae	Transfer
2026-03-05	07:52:26	Pembayaran Berhasil!	Warkop Bunda Aldo	10000	0	10000	Berhasil	19cbb7b99e58d392	QRIS
2026-03-05	13:53:06	Transfer dengan BI Fast Berhasil	GRACE LORENTZ - Bank Central Asia	153000	2500	155500	Berhasil	19cbcc59f040a2db	Transfer BI Fast
2026-03-05	18:18:11	Pembayaran Berhasil!	SPBU 14.2021119,SUTOMO	38050	0	38050	Berhasil	19cbdb84e92f59d1	QRIS
2026-03-05	18:42:58	Pembayaran Berhasil!	BUFFET AHMAD SALIM 3	52000	0	52000	Berhasil	19cbdcf1250b1dd5	QRIS
2026-03-05	19:09:01	Transfer Berhasil	IGA ARWANA	29000	0	29000	Berhasil	19cbde6ddc6973ba	Transfer
2026-03-08	12:02:48	Transfer dengan BI Fast Berhasil	ROHDEARNI BARUTU - Bank Rakyat Indonesia	200000	2500	202500	Berhasil	19ccbd3bb8100b47	Transfer BI Fast
2026-03-08	20:23:15	Pembayaran Berhasil!	ALGO MEDAN - QRIS	33800	0	33800	Berhasil	19ccd9de169dc55a	QRIS
2026-03-09	07:53:02	Pembayaran Berhasil!	Toko Obat Uli Parna	56000	0	56000	Berhasil	19cd0157b72dabc1	QRIS
2026-03-10	07:40:36	Pembayaran Berhasil!	Toko Obat Uli Parna	13000	0	13000	Berhasil	19cd5307e98f3d16	QRIS
2026-03-10	08:02:31	Pembayaran Berhasil!	Nasi Kuning Komplek Warta	16000	0	16000	Berhasil	19cd54485f5511c5	QRIS
2026-03-10	08:21:15	Pembayaran Berhasil!	Yara Ponsel Qr	12000	0	12000	Berhasil	19cd555b24fd95db	QRIS
2026-03-10	20:20:14	Pembayaran Berhasil!	IDM QRIS LIVIN	8700	0	8700	Berhasil	19cd7e7c31fe6372	QRIS
2026-03-11	18:42:40	Transfer dengan BI Fast Berhasil	SAMUEL ZAKARIA H - Bank Central Asia	80000	2500	82500	Berhasil	19cdcb4dab618e9a	Transfer ke rekening sendiri
2026-03-12	07:28:10	Pembayaran Berhasil!	Toko Obat Uli Parna	16000	0	16000	Berhasil	19cdf71d6a81cae3	QRIS
2026-03-12	07:50:32	Pembayaran Berhasil!	Nasi Kuning Komplek Warta	15000	0	15000	Berhasil	19cdf86440df0b2b	QRIS
2026-03-12	17:58:53	Pembayaran Berhasil!	BUFFET AHMAD SALIM 3	27000	0	27000	Berhasil	19ce1b332b8c6da9	QRIS
2026-03-12	21:01:58	Pembayaran Tidak Berhasil	Toko Obat Uli Parna	3000	0	0	Gagal	19ce25ae5537aa4c	Transaksi gagal, tidak dihitung
2026-03-12	21:02:27	Pembayaran Berhasil!	Toko Obat Uli Parna	6000	0	6000	Berhasil	19ce25b74a2b9422	QRIS
2026-03-12	21:03:39	Pembayaran Berhasil!	Burger Orio	20000	0	20000	Berhasil	19ce25ca5c022820	QRIS
2026-03-13	14:05:52	Transfer Berhasil	JESSICA EVANGELI	17000	0	17000	Berhasil	19ce6044abbf5071	Transfer
2026-03-13	14:06:29	Transfer Berhasil	OLIB FELIX ANDIKA AR	56000	0	56000	Berhasil	19ce609faa391730	Transfer QR
2026-03-13	14:07:33	Transfer Berhasil	OLIB FELIX ANDIKA AR	5000	0	5000	Berhasil	19ce605d8a8f03f9	Transfer QR
2026-03-14	16:34:56	Pembayaran Berhasil!	NAZWA KUE - BRI	225500	0	225500	Berhasil	19cebb318cadffe9	QRIS
2026-03-14	16:35:38	Pembayaran Berhasil!	Nazwa Kue dan Catering	55000	0	55000	Berhasil	19cebb3bf68ddc16	QRIS
2026-03-16	17:33:31	Transfer dengan BI Fast Berhasil	KOK LI - Bank Danamon Indonesia	12000	2500	14500	Berhasil	19cf6355bd9eb797	Transfer BI Fast
2026-03-16	17:38:12	Transfer dengan BI Fast Berhasil	KOK LI - Bank Danamon Indonesia	10000	2500	12500	Berhasil	19cf639b12f2c468	Transfer BI Fast
2026-03-18	19:55:20	Pembayaran Berhasil!	BUFFET AHMAD SALIM 3	27000	0	27000	Berhasil	19d010405a92b7fb	QRIS
2026-03-20	13:42:58	Transfer Berhasil	JULIA MENTARI	27000	0	27000	Berhasil	19d09fbcc074a701	Transfer QR
2026-03-21	08:28:30	Top-up Berhasil	GoPay Customer ****9604	50000	1000	51000	Berhasil	19d0e0230f1dcbe7	Top-up
2026-03-21	08:32:12	Top-up Berhasil	GoPay Customer ****9604	40000	1000	41000	Berhasil	19d0e0588c87d079	Top-up
2026-03-22	20:39:13	Pembayaran Berhasil!	MIE PANGSIT ASIN -HO	67000	0	67000	Berhasil	19d15c5961520e0d	QRIS
2026-03-23	11:50:47	Top-up Berhasil	GoPay Customer ****9604	70000	1000	71000	Berhasil	19d190806533dc4e	Top-up
2026-03-27	09:55:01	Transfer Berhasil	TOTO PRAYETNO	135000	0	135000	Berhasil	19d2d3798d703921	Transfer
2026-03-29	09:18:59	Pembayaran Berhasil!	IDM QRIS LIVIN	22500	0	22500	Berhasil	19d37634c277832b	QRIS
2026-03-29	19:01:29	Pembayaran Berhasil!	SPBU SINGAPORE STATION 5	30780	0	30780	Berhasil	19d3978925589f63	QRIS
2026-03-31	13:05:57	Transfer Berhasil	MUHAMMAD RIDHO FEBRI	100000	0	100000	Berhasil	19d427fc98b3e451	Transfer QR
2026-03-31	20:02:36	Pembayaran Berhasil!	Gopay Payment 60739081370309604	366572	0	366572	Berhasil	19d43fd814ad1322	Aggregator payment
2026-04-01	18:30:13	Top-up Berhasil	GoPay Customer ****9604	50000	1000	51000	Berhasil	19d48cf16f5764d6	Top-up
2026-04-01	18:32:15	Pembayaran Berhasil!	Gopay Payment 60739081370309604	876168	0	876168	Berhasil	19d48d10364b0c7f	Aggregator payment
2026-04-01	18:34:17	Transfer dengan BI Fast Berhasil	JOICE MELATI H - Bank Negara Indonesia	232000	2500	234500	Berhasil	19d48d2aa21ffcb9	Transfer BI Fast
2026-04-01	18:38:55	Pembayaran Berhasil!	PT Tokopedia Jakarta Selatan	190049	0	190049	Berhasil	19d48d72f9c0a49e	QRIS
2026-04-02	07:51:24	Top-up Berhasil	GoPay Customer ****9604	150000	1000	151000	Berhasil	19d4bac8de3ff667	Top-up
2026-04-02	17:11:45	Pembayaran Berhasil!	JCO R A MALIK MEDAN 1123	46000	0	46000	Berhasil	19d4dada2a729cb0	QRIS
2026-04-02	22:47:47	Pembayaran Berhasil!	Burger Orio	20000	0	20000	Berhasil	19d4ee13b8378f1b	QRIS
2026-04-03	13:31:52	Pembayaran Berhasil!	MIE SOP BLITAR WARISAN	153000	0	153000	Berhasil	19d520a955c1a738	QRIS
2026-04-03	19:27:57	Top-up Berhasil	GoPay Customer ****9604	150000	1000	151000	Berhasil	19d5350a064c9d7d	Top-up
2026-04-07	07:19:44	Top-up Berhasil	GoPay Customer ****9604	60000	1000	61000	Berhasil	19d654f59c1f7c21	Top-up
2026-04-07	23:37:06	Transfer dengan BI Fast Berhasil	SAMUEL ZAKARIA H - Bank Central Asia	200000	2500	202500	Berhasil	19d68ce283e3f313	Transfer ke rekening sendiri
2026-04-08	12:07:37	Transfer Berhasil	IGA ARWANA	16000	0	16000	Berhasil	19d6b7d3d2353476	Transfer
2026-04-09	16:38:49	Transfer Berhasil	OLIB FELIX ANDIKA AR	8000	0	8000	Berhasil	19d719c062cfc101	Transfer QR
2026-04-09	21:00:34	Pembayaran Berhasil!	TASHIDELEK BURGER	29000	0	29000	Berhasil	19d728b9a391c2a6	QRIS
2026-04-10	07:43:15	Pembayaran Berhasil!	Nasi Kuning Komplek Warta	15000	0	15000	Berhasil	19d74d80ab9d34b8	QRIS
2026-04-10	14:57:57	Transfer Berhasil	JESSICA EVANGELI	57000	0	57000	Berhasil	19d76661a39ac346	Transfer
2026-04-10	21:10:09	Pembayaran Berhasil!	TOKO OBAT KARUNIA FARMA	19000	0	19000	Berhasil	19d77baccc60f03b	QRIS
2026-04-10	21:58:56	Pembayaran Berhasil!	MIE AYAM KAMPUNG GOKIL	96800	0	96800	Berhasil	19d77e765ab05dde	QRIS
2026-04-11	16:14:24	Top-up Berhasil	GoPay Customer ****9604	100000	1000	101000	Berhasil	19d7bd24895d735f	Top-up
2026-04-11	18:50:21	Pembayaran Berhasil!	BUFFET AHMAD SALIM 3	56000	0	56000	Berhasil	19d7c610b4cd8866	QRIS
2026-04-12	12:54:44	Transfer dengan BI Fast Berhasil	JOJOR RIOVIKA BR SIH - Bank Rakyat Indonesia	200000	2500	202500	Berhasil	19d8041dcc9c04a9	Transfer BI Fast
2026-04-12	13:14:59	Pembayaran Berhasil!	MIE AYAM KAMPUNG GOKIL	55000	0	55000	Berhasil	19d80545991a846b	QRIS
2026-04-12	14:04:01	Pembayaran Berhasil!	CHOCO BAKERY HALAT	163000	0	163000	Berhasil	19d8081475051984	QRIS
2026-04-12	15:11:28	Pembayaran Berhasil!	SPBU SINGAPORE STATION 5	43220	0	43220	Berhasil	19d80bf19b45557f	QRIS
2026-04-12	16:55:21	Top-up Berhasil	Danatopup ****2563	35000	1000	36000	Berhasil	19d811e25f9a4399	Top-up
2026-04-12	17:02:42	Top-up Berhasil	Danatopup ****5266	20500	1000	21500	Berhasil	19d8124e4c547736	Top-up
2026-04-12	19:55:27	Pembayaran Berhasil!	SOUR SALLY CENTER POINT	101000	0	101000	Berhasil	19d81c305cab6b9e	QRIS
2026-04-12	21:33:09	Pembayaran Berhasil!	THE COFFEE CROWD	331000	0	331000	Berhasil	19d821c8d066cf5a	QRIS
2026-04-15	07:52:04	Pembayaran Berhasil!	IDM QRIS LIVIN	68400	0	68400	Berhasil	19d8e9fc783d0e1b	QRIS
2026-04-15	21:56:59	Transfer dengan BI Fast Berhasil	RIA REJEKI TAMBA - Bank Rakyat Indonesia	20000	2500	22500	Berhasil	19d91a566fa75a35	Transfer BI Fast
2026-04-17	07:36:57	Pembayaran Berhasil!	Nasi Kuning Komplek Warta	15000	0	15000	Berhasil	19d98dedccce0eef	QRIS
2026-04-18	07:32:33	Pembayaran Berhasil!	MIE BAHAGIA YENNY-HO	63000	0	63000	Berhasil	19d9e0122a809373	QRIS
2026-04-19	17:28:52	Pembayaran Berhasil!	KOKORO COFFEE	80000	0	80000	Berhasil	19da5496dfe79466	QRIS
2026-04-20	07:48:08	Pembayaran Berhasil!	Nasi Kuning Komplek Warta	15000	0	15000	Berhasil	19da85c1533b37a5	QRIS
2026-04-20	17:50:58	Transfer dengan BI Fast Berhasil	KOK LI - Bank Danamon Indonesia	24000	2500	26500	Berhasil	19daa83f1748d3ee	Transfer BI Fast
2026-04-21	23:39:41	Permintaan Penjualan Reksa Dana Terkirim	Mandiri Investa Syariah Berimbang Kelas A	0	0	0	Berhasil	19db0e9946142bb6	Non-pengeluaran investasi
2026-04-22	06:25:57	Transfer dengan BI Fast Berhasil	ROHDEARNI BARUTU - Bank Permata	10000000	2500	10002500	Berhasil	19db25d85ead9a92	Transfer besar, perlu konfirmasi tujuan
2026-04-22	15:01:22	Penjualan Reksa Dana Dikonfirmasi	Mandiri Investa Syariah Berimbang Kelas A	0	0	0	Berhasil	19db43562e6a0599	Non-pengeluaran investasi
2026-04-22	15:04:04	Transfer Berhasil	OLIB FELIX ANDIKA AR	20000	0	20000	Berhasil	19db437deb6bceb1	Transfer QR
2026-04-22	18:04:13	Pembayaran Berhasil!	TASHIDELEK BURGER	22000	0	22000	Berhasil	19db4dcd3c142055	QRIS
2026-04-23	11:01:34	Penjualan Reksa Dana Selesai	Mandiri Investa Syariah Berimbang Kelas A	0	0	0	Berhasil	19db8803765157c3	Non-pengeluaran investasi
2026-04-23	15:48:05	Transfer Berhasil	JULIA MENTARI	207250	0	207250	Berhasil	19db986937733498	Transfer QR
2026-04-23	19:04:16	Pembayaran Berhasil!	SPBU 11-201102	40270	0	40270	Berhasil	19dba3a2acbb25e8	QRIS
2026-04-24	07:47:36	Pembayaran Berhasil!	Nasi Kuning Komplek Warta	15000	0	15000	Berhasil	19dbcf4f99734cd7	QRIS
2026-04-24	08:05:55	Pembayaran Berhasil!	Tokopedia 8870881370309604	552250	3000	555250	Berhasil	19dbd05fa03c1966	Payment
2026-04-24	14:04:23	Transfer Berhasil	OLIB FELIX ANDIKA AR	10000	0	10000	Berhasil	19dbe4e1b725d205	Transfer QR
2026-04-24	14:05:30	Transfer Berhasil	JULIA MENTARI	7000	0	7000	Berhasil	19dbe4f138ff8e46	Transfer QR
2026-04-25	15:29:41	Pembayaran Berhasil!	NELAYAN SHANGHAI KAFE	504900	0	504900	Berhasil	19dc3c27dd18bcf5	QRIS
2026-04-25	17:04:11	Pembayaran Berhasil!	TOKO OBAT KARUNIA FARMA	30000	0	30000	Berhasil	19dc418f19852838	QRIS
2026-04-29	08:41:56	Transfer Berhasil	JESSICA EVANGELI	24000	0	24000	Berhasil	19dd6e66a55b0f2f	Transfer
2026-04-29	17:13:13	Pembayaran Berhasil!	Coda Payments	158175	0	158175	Berhasil	19dd8bab00b00f4d	QRIS
2026-04-29	22:04:09	Pembayaran Berhasil!	PT Tokopedia Jakarta Selatan	263388	0	263388	Berhasil	19dd9c50eb71061c	QRIS
2026-04-29	22:05:36	Pembayaran Berhasil!	Gopay Payment 60739081370309604	500000	0	500000	Berhasil	19dd9c661211b442	Aggregator payment
2026-04-29	22:08:43	Pembayaran Berhasil!	Gopay Payment 60739081370309604	398623	0	398623	Berhasil	19dd9c93fdca1bb2	Aggregator payment
2026-04-29	22:09:47	Pembayaran Berhasil!	Gopay Payment 60739081370309604	146400	0	146400	Berhasil	19dd9ca38f1ef211	Aggregator payment
2026-04-30	13:24:15	Pembayaran Berhasil!	Gopay Payment 60739081370309604	3398144	0	3398144	Berhasil	19ddd0f69a3e4b5a	Aggregator payment
2026-04-30	18:39:09	Transfer Berhasil	MUHAMMAD RIDHO FEBRI	33000	0	33000	Berhasil	19dde2fd48aa612d	Transfer
2026-05-02	10:14:57	Transfer dengan BI Fast Berhasil	JOICE MELATI H - Bank Negara Indonesia	232000	2500	234500	Berhasil	19de6aec9c33ba4c	Transfer BI Fast
2026-05-02	19:25:15	Pembayaran Berhasil!	RICHEESE FACTORY	93500	0	93500	Berhasil	19de8a69a1c9b4a5	QRIS
2026-05-05	16:33:04	Transfer Berhasil	JESSICA EVANGELI	51000	0	51000	Berhasil	19df77c04b18229f	Transfer
2026-05-06	07:08:24	Transfer dengan BI Fast Berhasil	JOICE MELATI H - Bank Negara Indonesia	350000	2500	352500	Berhasil	19dfa9d621527ce2	Transfer BI Fast
2026-05-06	12:49:29	Transfer Berhasil	MUHAMMAD RIDHO FEBRI	8000	0	8000	Berhasil	19dfbd59ff19d64a	Transfer
2026-05-06	18:35:51	Pembayaran Berhasil!	SPBU 14.2021119,SUTOMO	39560	0	39560	Berhasil	19dfd12d601ff41e	QRIS
2026-05-06	19:36:46	Pembayaran Berhasil!	ALGO MEDAN - QRIS	164900	0	164900	Berhasil	19dfd4a9a3f91a1b	QRIS
2026-05-07	16:30:13	Transfer Berhasil	MERLYN SUWARNI	30000	0	30000	Berhasil	19e01c60242621cf	Transfer
2026-05-07	17:43:53	Transfer dengan BI Fast Berhasil	KOK LI - Bank Danamon Indonesia	24000	2500	26500	Berhasil	19e0209884a43be2	Transfer BI Fast
2026-05-07	17:45:50	Transfer dengan BI Fast Berhasil	KOK LI - Bank Danamon Indonesia	10000	2500	12500	Berhasil	19e020b4f8cd59c3	Transfer BI Fast
2026-05-08	14:23:21	Pembayaran Berhasil!	Sbux Cemara Asri Medan	145000	0	145000	Berhasil	19e0678672af9dd3	QRIS
2026-05-08	14:24:38	Transfer dengan BI Fast Berhasil	SAMUEL ZAKARIA H - Bank Central Asia	60000	2500	62500	Berhasil	19e06796dba24614	Transfer ke rekening sendiri
2026-05-13	14:00:39	Transfer dengan BI Fast Berhasil	SAMUEL ZAKARIA H - Krom Bank Indonesia	150000	2500	152500	Berhasil	19e20235eb51160f	Transfer ke rekening sendiri
2026-05-13	14:01:34	Transfer dengan BI Fast Berhasil	SAMUEL ZAKARIA H - Bank Central Asia	150000	2500	152500	Berhasil	19e20241c639a348	Transfer ke rekening sendiri
2026-05-14	17:53:20	Transfer dengan BI Fast Berhasil	SAMUEL ZAKARIA H - Bank Central Asia	300000	2500	302500	Berhasil	19e261ebc8c91b7b	Transfer ke rekening sendiri
2026-05-14	21:32:38	Pembayaran Berhasil!	KIMUKATSU SUN PLAZA MEDAN	260018	0	260018	Berhasil	19e26e78614a2920	QRIS
2026-05-14	21:41:40	Pembayaran Berhasil!	GUARDIAN 3355 - MEDAN SUN	167000	0	167000	Berhasil	19e26efbe250f6b5	QRIS
2026-05-15	08:42:04	Transfer Berhasil	JULIA MENTARI	42000	0	42000	Berhasil	19e294c76a24ff18	Transfer QR
2026-05-15	20:30:07	Pembayaran Berhasil!	KIMUKATSU DELI PARK MDN	222706	0	222706	Berhasil	19e2bd4ae51aa150	QRIS
2026-05-16	11:31:27	Pembayaran Berhasil!	ALGO MEDAN - QRIS	125000	0	125000	Berhasil	19e2f0dcb98cc7f5	QRIS
2026-05-18	09:44:56	Transfer dengan BI Fast Berhasil	ROHDEARNI BARUTU - Bank Rakyat Indonesia	200000	2500	202500	Berhasil	19e38f9075a951f7	Transfer BI Fast
2026-05-20	17:18:55	Pembayaran Berhasil!	MyTelkomsel Apps	50000	0	50000	Berhasil	19e44e55cf8a9aa8	QRIS
2026-05-22	21:03:52	Pembayaran Berhasil!	KEMBAR CAFE RESTO ZONA 1	66000	0	66000	Berhasil	19e500007d0d6fa2	QRIS
2026-05-23	17:37:56	Pembayaran Berhasil!	KOPI MEDAN	78972	0	78972	Berhasil	19e5469ebb9c3efe	QRIS
2026-05-23	19:25:32	Pembayaran Berhasil!	HOTEL DANAU TOBA INTERNAS	206618	0	206618	Berhasil	19e54cc89ca05b7f	QRIS
2026-05-24	20:32:49	Top-up Berhasil	Danatopup ****0965	35000	1000	36000	Berhasil	19e5a30555c95885	Top-up
2026-05-26	11:02:14	Pembayaran Berhasil!	ALGO MEDAN - QRIS	22500	0	22500	Berhasil	19e6272b9680a81e	QRIS
2026-05-28	20:20:03	Pembayaran Berhasil!	Toko Obat Uli Parna	22000	0	22000	Berhasil	19e6ebe2bfa85b07	QRIS
2026-05-29	07:27:04	Pembayaran Berhasil!	Toko Fitri Cemara	8000	0	8000	Berhasil	19e7120d19dc3d9d	QRIS
2026-05-29	13:14:40	Pembayaran Berhasil!	MAISON PIERRE BOULANGERIE	28000	0	28000	Berhasil	19e725f0dcb74a01	QRIS
2026-05-29	17:07:14	Transfer Berhasil	OLIB FELIX ANDIKA AR	10000	0	10000	Berhasil	19e7333e20c1b4e4	Transfer QR
2026-05-30	17:48:24	Pembayaran Berhasil!	Gopay Payment 60739081370309604	228300	0	228300	Berhasil	19e788008d2816dd	Aggregator payment
2026-06-01	20:37:30	Pembayaran Berhasil!	Tokopedia 8870800231081108	126876	1000	127876	Berhasil	19e836782a2d2434	Payment
2026-06-02	15:17:02	Pembayaran Berhasil!	Gopay Payment 60739081370309604	2880246	0	2880246	Berhasil	19e876873895a42b	Aggregator payment
2026-06-02	16:42:15	Pembayaran Berhasil!	Toko Fitri Cemara	24000	0	24000	Berhasil	19e87b69401846da	QRIS
2026-06-02	20:17:25	Transfer dengan BI Fast Berhasil	JOICE MELATI H - Bank Negara Indonesia	232000	2500	234500	Berhasil	19e887b6feefc66b	Transfer BI Fast
2026-06-03	17:46:55	Transfer dengan BI Fast Berhasil	KOK LI - Bank Danamon Indonesia	12000	2500	14500	Berhasil	19e8d181abe06b18	Transfer BI Fast
2026-06-05	11:03:34	Pembayaran Berhasil!	Gopay Payment 60739081370309604	444501	0	444501	Berhasil	19e95f39dabf3cea	Aggregator payment
2026-06-05	11:50:59	Transfer Berhasil	JESSICA EVANGELI	79000	0	79000	Berhasil	19e961ee4487d347	Transfer
2026-06-05	13:27:09	Top-up Berhasil	GoPay Customer ****9604	50000	1000	51000	Berhasil	19e9676e4a9ea617	Top-up
2026-06-05	15:43:55	Pembayaran Berhasil!	Toko Fitri Cemara	30000	0	30000	Berhasil	19e96f4671dfda7e	QRIS
2026-06-05	20:01:43	Pembayaran Berhasil!	MyTelkomsel Apps	50000	0	50000	Berhasil	19e97e02a659487c	QRIS
2026-06-05	21:28:15	Pembayaran Berhasil!	SINAR UTAMA - HO	173800	0	173800	Berhasil	19e982f7ae2f6928	QRIS
2026-06-07	14:19:19	Pembayaran Berhasil!	GUARDIAN MEDAN DELIPARK	64500	0	64500	Berhasil	19ea0f378bcaf0c7	QRIS
2026-06-07	14:30:15	Pembayaran Berhasil!	SOUR SALLY-HO	172000	0	172000	Berhasil	19ea0fd69a9c7594	QRIS
2026-06-07	20:45:33	Transfer dengan BI Fast Berhasil	MEILINDA WIDJAJA - Bank Central Asia	156000	2500	158500	Berhasil	19ea255039106e63	Transfer BI Fast
2026-06-07	21:11:28	Pembayaran Berhasil!	ALGO MEDAN - QRIS	81100	0	81100	Berhasil	19ea26cc2db11aaf	QRIS
2026-06-08	07:55:30	Pembayaran Berhasil!	GRAB TRANSPORT	40500	0	40500	Berhasil	19ea4ba763497c7b	QRIS
2026-06-09	07:35:48	Pembayaran Berhasil!	IDM QRIS LIVIN	24200	0	24200	Berhasil	19ea9ceb0f831800	QRIS
2026-06-10	17:07:53	Pembayaran Berhasil!	Coda Payments	159757	0	159757	Berhasil	19eb100eabf8c39e	QRIS
2026-06-11	18:01:22	Transfer dengan BI Fast Berhasil	SAMUEL ZAKARIA H - Krom Bank Indonesia	1500000	2500	1502500	Berhasil	19eb6582a5be3525	Transfer ke rekening sendiri
2026-06-11	20:27:02	Top-up Berhasil	Danatopup ****2563	50000	1000	51000	Berhasil	19eb6dd7fb24afab	Top-up
2026-06-12	08:22:11	Pembayaran Berhasil!	Toko Fitri Cemara	13000	0	13000	Berhasil	19eb96c495bb4962	QRIS
2026-06-12	10:19:16	Pembayaran Berhasil!	Domainesia	743483	0	743483	Berhasil	19eb9d7971f44b5e	QRIS
2026-06-12	17:00:32	Pembayaran Berhasil!	Yara Ponsel Qr	11000	0	11000	Berhasil	19ebb46e50a15b22	QRIS
2026-06-12	22:50:15	Pembayaran Berhasil!	Coda Payments	84360	0	84360	Berhasil	19ebc870c82dd22e	QRIS
2026-06-13	16:44:42	Pembayaran Berhasil!	IDM QRIS LIVIN	14200	0	14200	Berhasil	19ec05eafa2463ef	QRIS
2026-06-13	18:48:02	Pembayaran Berhasil!	XVET - MR.D.I.Y FS RUKO M	312000	0	312000	Berhasil	19ec0cf9e29759b4	QRIS
2026-06-13	18:49:44	Top-up Berhasil	GoPay Customer ****9604	50000	1000	51000	Berhasil	19ec0d1253d472d1	Top-up
2026-06-13	18:50:51	Top-up Berhasil	GoPay Customer ****9604	50000	1000	51000	Berhasil	19ec0d2281c17049	Top-up
2026-06-13	20:11:44	Pembayaran Berhasil!	MIE SOP BLITAR WARISAN	85000	0	85000	Berhasil	19ec11c3d62cf442	QRIS
2026-06-14	20:33:33	Pembayaran Berhasil!	Luna*ES KRIM POKAT AU CAB	46000	0	46000	Berhasil	19ec656911645f1d	QRIS
2026-06-15	17:48:42	Transfer dengan BI Fast Berhasil	JOICE MELATI H - Bank Negara Indonesia	200000	2500	202500	Berhasil	19ecae5fdb95c6fc	Transfer BI Fast
2026-06-15	18:16:42	Pembayaran Berhasil!	Toko Obat Uli Parna	40000	0	40000	Berhasil	19ecaffaaeb34bcc	QRIS
2026-06-15	18:21:06	Pembayaran Berhasil!	ALGO MEDAN - QRIS	114400	0	114400	Berhasil	19ecb03ab426ef3e	QRIS
2026-06-15	19:17:31	Pembayaran Berhasil!	Coda Payments	159757	0	159757	Berhasil	19ecb376d476a5c0	QRIS
2026-06-19	12:00:31	Transfer Berhasil	TOTO PRAYETNO	39000	0	39000	Berhasil	19ede40b66bccd5e	Transfer QR, keterangan keju boss
2026-06-19	15:57:47	Pembayaran Berhasil!	Sbux Cemara Asri Medan	65000	0	65000	Berhasil	19edf1a092cb1a7a	QRIS
2026-06-20	00:21:17	Pembayaran Berhasil!	APOTEK KF 027	32100	0	32100	Berhasil	19ee0e6d106f6dba	QRIS
2026-06-20	20:28:00	Transfer Berhasil	JESSICA EVANGELI	6500	0	6500	Berhasil	19ee537a3f4d5565	Transfer
2026-06-21	19:03:28	Pembayaran Berhasil!	Coda Payments	85204	0	85204	Berhasil	19eea109336aa267	QRIS
2026-06-22	18:13:04	Pembayaran Berhasil!	SPBU 14.2021119,SUTOMO	59440	0	59440	Berhasil	19eef08d5b310275	QRIS
2026-06-23	07:27:29	Pembayaran Berhasil!	Toko Obat Uli Parna	31000	0	31000	Berhasil	19ef1e02ed0cf9f0	QRIS
2026-06-23	15:50:39	Top-up Berhasil	GoPay Customer ****9604	15000	1000	16000	Berhasil	19ef3acd3ff61e4e	Top-up
2026-06-23	17:59:33	Pembayaran Berhasil!	BUFFET AHMAD SALIM 3	29000	0	29000	Berhasil	19ef422ef8511077	QRIS
2026-06-24	16:20:23	Pembayaran Berhasil!	Yara Ponsel Qr	9000	0	9000	Berhasil	19ef8ee739b90f1c	QRIS
2026-06-24	16:21:06	Pembayaran Berhasil!	Yara Ponsel Qr	10000	0	10000	Berhasil	19ef8ef1269f00d4	QRIS
2026-06-25	07:48:14	Pembayaran Berhasil!	Nasi Kuning Komplek Warta	20000	0	20000	Berhasil	19efc3fe3c7caf3d	QRIS`;

const idr = new Intl.NumberFormat("id-ID");

function toDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function monthLabel(date) {
  return date.toLocaleString("en-US", { month: "short", year: "numeric" });
}

function parseRows(tsv) {
  const [headerLine, ...lines] = tsv.trim().split("\n");
  const headers = headerLine.split("\t");
  return lines.map((line) => {
    const cells = line.split("\t");
    const row = Object.fromEntries(headers.map((h, i) => [h, cells[i] ?? ""]));
    const date = toDate(row.date);
    const base = Number(row.base);
    const fee = Number(row.fee);
    const total = Number(row.total);
    return {
      ...row,
      date,
      month: monthLabel(date),
      base,
      fee,
      total,
      gmailUrl: `https://mail.google.com/mail/#all/${row.id}`,
    };
  });
}

function categorize(row) {
  const merchant = row.merchant.toLowerCase();
  const subject = row.subject.toLowerCase();
  const note = row.note.toLowerCase();

  if (row.status !== "Berhasil") return ["Transaksi Gagal/Exclude", "Gagal"];
  if (subject.includes("reksa dana") || merchant.includes("mandiri investa")) {
    return ["Investasi/Non-pengeluaran", "Reksa dana"];
  }
  if (merchant.includes("samuel zakaria")) {
    return ["Transfer Diri/Tabungan", "Rekening sendiri"];
  }
  if (subject.includes("top-up") || merchant.includes("gopay customer") || merchant.includes("danatopup")) {
    return ["Dompet Digital & Aggregator", merchant.includes("dana") ? "Top-up DANA" : "Top-up GoPay"];
  }
  if (merchant.includes("gopay payment")) return ["Dompet Digital & Aggregator", "GoPay Payment"];
  if (merchant.includes("coda")) return ["Digital, Gaming & Aplikasi", "Coda Payments"];
  if (merchant.includes("domainesia")) return ["Profesional/Tools", "Domain/hosting"];
  if (merchant.includes("mytelkomsel") || merchant.includes("yara ponsel")) {
    return ["Telekomunikasi", merchant.includes("yara") ? "Ponsel/aksesori" : "Pulsa/data"];
  }
  if (merchant.includes("spbu") || merchant.includes("grab transport")) {
    return ["Transportasi & BBM", merchant.includes("grab") ? "Transportasi online" : "BBM"];
  }
  if (merchant.includes("obat") || merchant.includes("apotek") || merchant.includes("guardian")) {
    return ["Kesehatan & Obat", merchant.includes("guardian") ? "Health retail" : "Obat/apotek"];
  }
  if (
    merchant.includes("tokopedia") ||
    merchant.includes("idm") ||
    merchant.includes("toko fitri") ||
    merchant.includes("mr.d.i.y") ||
    merchant.includes("sinar utama") ||
    merchant.includes("algo")
  ) {
    return ["Belanja Harian/Retail", merchant.includes("tokopedia") ? "Belanja online" : "Retail/minimarket"];
  }
  if (subject.includes("transfer")) return ["Transfer ke Orang", note.includes("keju") ? "Makanan via transfer" : "Transfer orang"];
  return ["Makan & Minum", "Makanan/minuman"];
}

function riskFor(row, category) {
  if (row.status !== "Berhasil") return "Exclude";
  if (category === "Investasi/Non-pengeluaran") return "Pisahkan dari biaya hidup";
  if (category === "Transfer Diri/Tabungan") return "Bukan konsumsi; cek sebagai tabungan";
  if (row.total >= 1000000) return "High review";
  if (category === "Dompet Digital & Aggregator") return "Perlu breakdown wallet";
  if (row.total >= 500000) return "Review";
  return "Normal";
}

const rows = parseRows(rawTsv).map((row) => {
  const [category, subcategory] = categorize(row);
  const cashOut = row.status === "Berhasil" && category !== "Investasi/Non-pengeluaran";
  const livingExpense = cashOut && category !== "Transfer Diri/Tabungan";
  return {
    ...row,
    category,
    subcategory,
    cashOut,
    livingExpense,
    risk: riskFor(row, category),
  };
});

function sumBy(predicate) {
  return rows.filter(predicate).reduce((sum, row) => sum + row.total, 0);
}

function countBy(predicate) {
  return rows.filter(predicate).length;
}

function groupBy(keyFn, predicate = () => true) {
  const map = new Map();
  for (const row of rows.filter(predicate)) {
    const key = keyFn(row);
    const current = map.get(key) ?? { count: 0, base: 0, fee: 0, total: 0 };
    current.count += 1;
    current.base += row.base;
    current.fee += row.fee;
    current.total += row.total;
    map.set(key, current);
  }
  return [...map.entries()].map(([key, value]) => ({ key, ...value }));
}

const months = ["Mar 2026", "Apr 2026", "May 2026", "Jun 2026"];
const categories = groupBy((r) => r.category, (r) => r.livingExpense)
  .sort((a, b) => b.total - a.total)
  .map((x) => x.key);
const topMerchants = groupBy((r) => r.merchant, (r) => r.livingExpense)
  .sort((a, b) => b.total - a.total)
  .slice(0, 20)
  .map((x) => x.key);

const cashOutTotal = sumBy((r) => r.cashOut);
const livingTotal = sumBy((r) => r.livingExpense);
const transferSelfTotal = sumBy((r) => r.category === "Transfer Diri/Tabungan");
const walletTotal = sumBy((r) => r.category === "Dompet Digital & Aggregator");
const transferPeopleTotal = sumBy((r) => r.category === "Transfer ke Orang");
const highReviewTotal = sumBy((r) => r.risk === "High review" || r.risk === "Review");
const nonExpenseCount = countBy((r) => !r.livingExpense);
const livingAvgMarMay =
  months.slice(0, 3).reduce((sum, m) => sum + sumBy((r) => r.month === m && r.livingExpense), 0) / 3;
const targetCut = Math.round(livingAvgMarMay * 0.2);
const survivalTarget = Math.round(livingAvgMarMay * 0.8);

const workbook = Workbook.create();

function setupSheet(sheet) {
  sheet.showGridLines = false;
}

function styleTitle(sheet, range, title, subtitle = "") {
  const titleRange = sheet.getRange(range);
  titleRange.merge();
  titleRange.values = [[title]];
  titleRange.format = {
    fill: "#12372A",
    font: { bold: true, color: "#FFFFFF", size: 18 },
    alignment: { horizontal: "left", vertical: "middle" },
  };
  titleRange.format.rowHeightPx = 34;
  if (subtitle) {
    const [colStart] = range.split(":");
    const col = colStart.match(/[A-Z]+/)[0];
    const row = Number(colStart.match(/\d+/)[0]) + 1;
    const sub = sheet.getRange(`${col}${row}:J${row}`);
    sub.merge();
    sub.values = [[subtitle]];
    sub.format = { font: { color: "#3B4A40", italic: true } };
  }
}

const transactions = workbook.worksheets.add("Transaksi");
setupSheet(transactions);
styleTitle(
  transactions,
  "A1:Q1",
  "Transaksi Livin Mandiri",
  "Sumber: Gmail Livin Mandiri, Maret 2026 sampai 25 Juni 2026"
);

const txHeaders = [
  "Tanggal",
  "Jam",
  "Bulan",
  "Subjek",
  "Merchant/Penerima",
  "Kategori",
  "Subkategori",
  "Nominal",
  "Biaya",
  "Total",
  "Status",
  "Arus Keluar Bank",
  "Masuk Pengeluaran Hidup",
  "Flag Risiko",
  "Catatan",
  "Email ID",
  "Link Gmail",
];

const txData = rows.map((row) => [
  row.date,
  row.time,
  row.month,
  row.subject,
  row.merchant,
  row.category,
  row.subcategory,
  row.base,
  row.fee,
  row.total,
  row.status,
  row.cashOut ? "Ya" : "Tidak",
  row.livingExpense ? "Ya" : "Tidak",
  row.risk,
  row.note,
  row.id,
  row.gmailUrl,
]);

transactions.getRange("A4:Q4").values = [txHeaders];
transactions.getRangeByIndexes(4, 0, txData.length, txHeaders.length).values = txData;
const txRange = transactions.getRange(`A4:Q${txData.length + 4}`);
transactions.tables.add(`A4:Q${txData.length + 4}`, true, "TransaksiLivin");
transactions.getRange("A4:Q4").format = {
  fill: "#436850",
  font: { bold: true, color: "#FFFFFF" },
};
transactions.getRange(`A5:A${txData.length + 4}`).setNumberFormat("yyyy-mm-dd");
transactions.getRange(`H5:J${txData.length + 4}`).setNumberFormat('"Rp"#,##0');
transactions.getRange("A:Q").format.autofitColumns();
transactions.getRange("A:A").format.columnWidth = 12;
transactions.getRange("D:D").format.columnWidth = 26;
transactions.getRange("E:E").format.columnWidth = 30;
transactions.getRange("F:G").format.columnWidth = 24;
transactions.getRange("N:O").format.columnWidth = 24;
transactions.getRange("Q:Q").format.columnWidth = 42;
transactions.freezePanes.freezeRows(4);
txRange.format.borders = { preset: "outside", style: "thin", color: "#A8B5A3" };

const monthly = workbook.worksheets.add("Ringkasan Bulanan");
setupSheet(monthly);
styleTitle(monthly, "A1:J1", "Ringkasan Bulanan", "Formula mengacu ke sheet Transaksi.");
monthly.getRange("A4:J4").values = [[
  "Bulan",
  "Jumlah Email",
  "Arus Keluar Bank",
  "Pengeluaran Hidup",
  "Transfer Diri/Tabungan",
  "Dompet Digital",
  "Transfer ke Orang",
  "Transaksi Terbesar",
  "Proyeksi Jun Full Month",
  "Rata-rata Harian Hidup",
]];
monthly.getRange("A5:A8").values = months.map((m) => [m]);
const lastRow = txData.length + 4;
for (let i = 0; i < months.length; i++) {
  const r = 5 + i;
  monthly.getRange(`B${r}:J${r}`).formulas = [[
    `=COUNTIF('Transaksi'!$C$5:$C$${lastRow},A${r})`,
    `=SUMIFS('Transaksi'!$J$5:$J$${lastRow},'Transaksi'!$C$5:$C$${lastRow},A${r},'Transaksi'!$L$5:$L$${lastRow},"Ya")`,
    `=SUMIFS('Transaksi'!$J$5:$J$${lastRow},'Transaksi'!$C$5:$C$${lastRow},A${r},'Transaksi'!$M$5:$M$${lastRow},"Ya")`,
    `=SUMIFS('Transaksi'!$J$5:$J$${lastRow},'Transaksi'!$C$5:$C$${lastRow},A${r},'Transaksi'!$F$5:$F$${lastRow},"Transfer Diri/Tabungan")`,
    `=SUMIFS('Transaksi'!$J$5:$J$${lastRow},'Transaksi'!$C$5:$C$${lastRow},A${r},'Transaksi'!$F$5:$F$${lastRow},"Dompet Digital & Aggregator")`,
    `=SUMIFS('Transaksi'!$J$5:$J$${lastRow},'Transaksi'!$C$5:$C$${lastRow},A${r},'Transaksi'!$F$5:$F$${lastRow},"Transfer ke Orang")`,
    `=MAXIFS('Transaksi'!$J$5:$J$${lastRow},'Transaksi'!$C$5:$C$${lastRow},A${r})`,
    `=IF(A${r}="Jun 2026",C${r}/25*30,"")`,
    `=IF(A${r}="Jun 2026",D${r}/25,D${r}/DAY(EOMONTH(DATEVALUE("1 "&A${r}),0)))`,
  ]];
}
monthly.getRange("A4:J4").format = {
  fill: "#436850",
  font: { bold: true, color: "#FFFFFF" },
};
monthly.getRange("C5:J8").setNumberFormat('"Rp"#,##0');
monthly.getRange("A:J").format.autofitColumns();
monthly.freezePanes.freezeRows(4);
monthly.getRange("A4:J8").format.borders = { preset: "all", style: "thin", color: "#D7DED2" };

const categorySheet = workbook.worksheets.add("Ringkasan Kategori");
setupSheet(categorySheet);
styleTitle(categorySheet, "A1:G1", "Ringkasan Kategori", "Kategori disusun untuk keputusan survival dan menabung.");
categorySheet.getRange("A4:G4").values = [[
  "Kategori",
  "Jumlah Transaksi",
  "Pengeluaran Hidup",
  "Share",
  "Rata-rata/Transaksi",
  "Flag",
  "Aksi Disarankan",
]];
categorySheet.getRangeByIndexes(4, 0, categories.length, 1).values = categories.map((c) => [c]);
for (let i = 0; i < categories.length; i++) {
  const r = 5 + i;
  categorySheet.getRange(`B${r}:G${r}`).formulas = [[
    `=COUNTIFS('Transaksi'!$F$5:$F$${lastRow},A${r},'Transaksi'!$M$5:$M$${lastRow},"Ya")`,
    `=SUMIFS('Transaksi'!$J$5:$J$${lastRow},'Transaksi'!$F$5:$F$${lastRow},A${r},'Transaksi'!$M$5:$M$${lastRow},"Ya")`,
    `=IFERROR(C${r}/SUM($C$5:$C$${categories.length + 4}),0)`,
    `=IFERROR(C${r}/B${r},0)`,
    `=IF(C${r}>500000,"Review","Normal")`,
    `=IF(A${r}="Dompet Digital & Aggregator","Buat batas mingguan dan breakdown dari GoPay/DANA",IF(A${r}="Transfer ke Orang","Wajib catatan tujuan transfer",IF(A${r}="Makan & Minum","Tetapkan kuota makan luar/cafe","Pantau bulanan")))`,
  ]];
}
categorySheet.getRange("A4:G4").format = { fill: "#436850", font: { bold: true, color: "#FFFFFF" } };
categorySheet.getRange(`C5:E${categories.length + 4}`).setNumberFormat('"Rp"#,##0');
categorySheet.getRange(`D5:D${categories.length + 4}`).setNumberFormat("0.0%");
categorySheet.getRange("A:G").format.autofitColumns();
categorySheet.getRange("A:A").format.columnWidth = 30;
categorySheet.getRange("G:G").format.columnWidth = 42;
categorySheet.freezePanes.freezeRows(4);

const merchantSheet = workbook.worksheets.add("Top Merchant");
setupSheet(merchantSheet);
styleTitle(merchantSheet, "A1:F1", "Top Merchant/Penerima", "Merchant dengan total pengeluaran hidup tertinggi.");
merchantSheet.getRange("A4:F4").values = [["Merchant/Penerima", "Kategori", "Jumlah Transaksi", "Total", "Rata-rata", "Catatan"]];
merchantSheet.getRangeByIndexes(4, 0, topMerchants.length, 1).values = topMerchants.map((m) => [m]);
for (let i = 0; i < topMerchants.length; i++) {
  const r = 5 + i;
  merchantSheet.getRange(`B${r}:F${r}`).formulas = [[
    `=INDEX('Transaksi'!$F$5:$F$${lastRow},MATCH(A${r},'Transaksi'!$E$5:$E$${lastRow},0))`,
    `=COUNTIFS('Transaksi'!$E$5:$E$${lastRow},A${r},'Transaksi'!$M$5:$M$${lastRow},"Ya")`,
    `=SUMIFS('Transaksi'!$J$5:$J$${lastRow},'Transaksi'!$E$5:$E$${lastRow},A${r},'Transaksi'!$M$5:$M$${lastRow},"Ya")`,
    `=IFERROR(D${r}/C${r},0)`,
    `=IF(D${r}>1000000,"Prioritas review",IF(C${r}>=3,"Pola berulang","Normal"))`,
  ]];
}
merchantSheet.getRange("A4:F4").format = { fill: "#436850", font: { bold: true, color: "#FFFFFF" } };
merchantSheet.getRange(`D5:E${topMerchants.length + 4}`).setNumberFormat('"Rp"#,##0');
merchantSheet.getRange("A:F").format.autofitColumns();
merchantSheet.getRange("A:A").format.columnWidth = 34;
merchantSheet.freezePanes.freezeRows(4);

const dashboard = workbook.worksheets.add("Dashboard");
setupSheet(dashboard);
styleTitle(dashboard, "A1:K1", "Dashboard Pengeluaran Livin Mandiri", "Maret 2026 - 25 Juni 2026 | Dibuat dari Gmail noreply.livin@bankmandiri.co.id");
dashboard.getRange("A4:K4").values = [["KPI", "Nilai", "", "KPI", "Nilai", "", "Catatan Cepat", "", "", "", ""]];
dashboard.getRange("A5:B10").values = [
  ["Email ditemukan", rows.length],
  ["Arus keluar bank", cashOutTotal],
  ["Pengeluaran hidup", livingTotal],
  ["Transfer diri/tabungan", transferSelfTotal],
  ["Dompet digital/aggregator", walletTotal],
  ["Transfer ke orang", transferPeopleTotal],
];
dashboard.getRange("D5:E10").values = [
  ["Transaksi non-pengeluaran/gagal", nonExpenseCount],
  ["Transaksi perlu review", countBy((r) => r.risk === "High review" || r.risk === "Review")],
  ["Nominal perlu review", highReviewTotal],
  ["Rata-rata hidup Mar-May", Math.round(livingAvgMarMay)],
  ["Target survival 80%", survivalTarget],
  ["Potensi cut 20%", targetCut],
];
const dashboardNotes = [
  "1. Pisahkan dompet digital dari pengeluaran final; angka GoPay/DANA masih agregat.",
  "2. April melonjak karena transfer besar Rp10.002.500; cek apakah hutang, keluarga, atau bisnis.",
  "3. Kategori makan/minum, retail, dan transfer kecil berulang cocok dipasang batas mingguan.",
  "4. Transfer ke rekening sendiri jangan dianggap hilang jika memang tabungan; tandai rekening tujuan.",
  "5. Untuk bertahan hidup, pakai target survival 80% dari rata-rata Mar-May sebagai baseline awal.",
  "",
  `Query Gmail: ${sourceQuery}`,
];
for (let i = 0; i < dashboardNotes.length; i++) {
  const row = 5 + i;
  const noteRange = dashboard.getRange(`G${row}:K${row}`);
  noteRange.merge();
  noteRange.values = [[dashboardNotes[i]]];
  noteRange.format.wrapText = true;
  noteRange.format.rowHeightPx = row === 11 ? 34 : 28;
}
dashboard.getRange("A4:E4").format = { fill: "#436850", font: { bold: true, color: "#FFFFFF" } };
dashboard.getRange("A5:E10").format.borders = { preset: "all", style: "thin", color: "#D7DED2" };
dashboard.getRange("B6:B10").setNumberFormat('"Rp"#,##0');
dashboard.getRange("E7:E10").setNumberFormat('"Rp"#,##0');
dashboard.getRange("A:K").format.autofitColumns();
dashboard.getRange("G:K").format.columnWidth = 30;
dashboard.getRange("G5:K11").format = {
  fill: "#F3F7F0",
  font: { color: "#12372A" },
  wrapText: true,
};

dashboard.getRange("M4:O4").values = [["Bulan", "Arus Keluar Bank", "Pengeluaran Hidup"]];
for (let i = 0; i < months.length; i++) {
  const sourceRow = 5 + i;
  const helperRow = 5 + i;
  dashboard.getRange(`M${helperRow}:O${helperRow}`).formulas = [[
    `='Ringkasan Bulanan'!A${sourceRow}`,
    `='Ringkasan Bulanan'!C${sourceRow}`,
    `='Ringkasan Bulanan'!D${sourceRow}`,
  ]];
}
dashboard.getRange("Q4:R4").values = [["Kategori", "Pengeluaran Hidup"]];
const categoryHelperRows = Math.min(categories.length, 8);
for (let i = 0; i < categoryHelperRows; i++) {
  const sourceRow = 5 + i;
  const helperRow = 5 + i;
  dashboard.getRange(`Q${helperRow}:R${helperRow}`).formulas = [[
    `='Ringkasan Kategori'!A${sourceRow}`,
    `='Ringkasan Kategori'!C${sourceRow}`,
  ]];
}
dashboard.getRange("M:R").format.columnWidth = 18;

const monthlyChart = dashboard.charts.add("line", dashboard.getRange("M4:O8"));
monthlyChart.title = "Arus Keluar vs Pengeluaran Hidup";
monthlyChart.yAxis = { numberFormatCode: '"Rp"#,##0' };
monthlyChart.xAxis = { axisType: "textAxis" };
monthlyChart.setPosition("A13", "F29");

const categoryChart = dashboard.charts.add("bar", dashboard.getRange(`Q4:R${categoryHelperRows + 4}`));
categoryChart.title = "Pengeluaran Hidup per Kategori";
categoryChart.yAxis = { numberFormatCode: '"Rp"#,##0' };
categoryChart.setPosition("G13", "K29");

const strategy = workbook.worksheets.add("Strategi");
setupSheet(strategy);
styleTitle(strategy, "A1:E1", "Strategi Bertahan & Menabung", "Gunakan sebagai rencana aksi, lalu update sesuai pemasukan bulanan aktual.");
strategy.getRange("A4:D8").values = [
  ["Input", "Nilai", "Formula/Notes", ""],
  ["Pemasukan bersih bulanan", "", "Isi manual untuk hitung rasio tabungan", ""],
  ["Target tabungan", 0.2, "Default 20%", ""],
  ["Target survival spending", survivalTarget, "80% dari rata-rata pengeluaran hidup Mar-May", ""],
  ["Potensi penghematan awal", targetCut, "20% dari rata-rata pengeluaran hidup Mar-May", ""],
];
strategy.getRange("A11:E11").values = [["Prioritas", "Area", "Masalah", "Aksi 30 Hari", "Metric"]];
strategy.getRange("A12:E18").values = [
  ["1", "Dompet digital/aggregator", `Rp ${idr.format(walletTotal)} keluar via GoPay/DANA/aggregator`, "Pisahkan top-up wajib vs impulsif; buat plafon mingguan dan rekonsiliasi mutasi GoPay/DANA.", "Top-up mingguan <= plafon"],
  ["2", "Transfer ke orang", `Rp ${idr.format(transferPeopleTotal)} tercatat sebagai transfer orang`, "Wajib isi keterangan tujuan, gabungkan transfer kecil, dan review transfer di atas Rp100.000.", "% transfer ber-keterangan"],
  ["3", "Makan & minum/cafe", "Banyak transaksi kecil berulang dan beberapa cafe/resto besar", "Tetapkan amplop makan luar; bawa bekal di hari kerja; cafe hanya dengan kuota.", "Total makan luar/minggu"],
  ["4", "Belanja online/retail", "Tokopedia, MR.DIY, ALGO, minimarket perlu dipisah kebutuhan vs keinginan", "Buat cooling period 24 jam untuk belanja non-obat/non-makanan.", "Jumlah transaksi impulsif"],
  ["5", "Transfer diri", `Rp ${idr.format(transferSelfTotal)} keluar ke rekening sendiri`, "Jika itu tabungan, tandai sebagai pay-yourself-first dan jangan dihitung sebagai biaya hidup.", "Saldo rekening tujuan naik"],
  ["6", "Transaksi besar", `Rp ${idr.format(highReviewTotal)} masuk flag review`, "Buat daftar transaksi besar: wajib ada tujuan, bukti, dan apakah recurring.", "100% transaksi besar terjelaskan"],
  ["7", "Dana darurat", "Belum ada data pemasukan/saldo", "Setelah isi pemasukan, set auto-save di awal bulan minimal sesuai target tabungan.", "Auto-save aktif"],
];
strategy.getRange("A4:D4").format = { fill: "#436850", font: { bold: true, color: "#FFFFFF" } };
strategy.getRange("A11:E11").format = { fill: "#436850", font: { bold: true, color: "#FFFFFF" } };
strategy.getRange("B5:B5").setNumberFormat('"Rp"#,##0');
strategy.getRange("B6:B6").setNumberFormat("0%");
strategy.getRange("B7:B8").setNumberFormat('"Rp"#,##0');
strategy.getRange("A:E").format.autofitColumns();
strategy.getRange("C:E").format.columnWidth = 36;
strategy.getRange("C12:E18").format.wrapText = true;
strategy.getRange("A11:E18").format.borders = { preset: "all", style: "thin", color: "#D7DED2" };

const method = workbook.worksheets.add("Sumber & Metode");
setupSheet(method);
styleTitle(method, "A1:B1", "Sumber & Metode", "Catatan audit atas ekstraksi dan kategorisasi.");
method.getRange("A4:B13").values = [
  ["Tanggal laporan", reportDate],
  ["Rentang data", "1 Mar 2026 - 25 Jun 2026"],
  ["Query Gmail", sourceQuery],
  ["Email ditemukan", rows.length],
  ["Baris transaksi sukses", countBy((r) => r.status === "Berhasil")],
  ["Transaksi gagal", countBy((r) => r.status !== "Berhasil")],
  ["Non-pengeluaran/investasi", countBy((r) => r.category === "Investasi/Non-pengeluaran")],
  ["Aturan utama", "Transfer diri dan reksa dana dipisahkan dari pengeluaran hidup."],
  ["Dompet digital", "Top-up/GoPay Payment tetap arus keluar bank, tetapi perlu breakdown dari aplikasi wallet."],
  ["Catatan privasi", "Data sumber berasal dari Gmail pribadi yang diminta user; workbook hanya disimpan lokal."],
];
method.getRange("A4:A13").format = { fill: "#E7F0E2", font: { bold: true } };
method.getRange("A:B").format.autofitColumns();
method.getRange("B:B").format.columnWidth = 92;
method.getRange("B4:B13").format.wrapText = true;

// Light conditional formatting for risk visibility.
transactions.getRange(`N5:N${lastRow}`).conditionalFormats.add("containsText", {
  text: "High review",
  format: { fill: "#FCA5A5", font: { bold: true, color: "#7F1D1D" } },
});
transactions.getRange(`N5:N${lastRow}`).conditionalFormats.add("containsText", {
  text: "Perlu breakdown",
  format: { fill: "#FDE68A", font: { color: "#713F12" } },
});

const sheetsToRender = [
  ["Dashboard", "A1:K30"],
  ["Ringkasan Bulanan", "A1:J10"],
  ["Ringkasan Kategori", `A1:G${categories.length + 6}`],
  ["Top Merchant", "A1:F25"],
  ["Strategi", "A1:E20"],
  ["Sumber & Metode", "A1:E15"],
  ["Transaksi", "A1:Q25"],
];

await fs.mkdir(outputDir, { recursive: true });
for (const [sheetName, range] of sheetsToRender) {
  const png = await workbook.render({ sheetName, range, scale: 1, format: "png" });
  await fs.writeFile(
    `${outputDir}/preview_${sheetName.replaceAll(" ", "_").replaceAll("&", "and")}.png`,
    new Uint8Array(await png.arrayBuffer())
  );
}

const inspectDashboard = await workbook.inspect({
  kind: "table",
  sheetId: "Dashboard",
  range: "A1:K12",
  include: "values,formulas",
  tableMaxRows: 14,
  tableMaxCols: 11,
  maxChars: 8000,
});
console.log(inspectDashboard.ndjson);

const formulaErrors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 300 },
  summary: "final formula error scan",
  maxChars: 4000,
});
console.log(formulaErrors.ndjson);

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(`${outputDir}/laporan_pengeluaran_livin_mandiri_mar_jun_2026.xlsx`);
console.log(`${outputDir}/laporan_pengeluaran_livin_mandiri_mar_jun_2026.xlsx`);
