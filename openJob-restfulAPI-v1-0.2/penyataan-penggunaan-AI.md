## Pernyataan Penggunaan AI

Dalam proses pengerjaan submission ini, saya menggunakan bantuan teknologi Artificial Intelligence (AI), yaitu ChatGPT dan Gemini, sebagai alat pendukung pembelajaran dan pengembangan.

### Penggunaan ChatGPT
Penggunaan ChatGPT dalam submission ini meliputi:
- Membantu memperjelas studi kasus dan kriteria yang diberikan oleh tim Dicoding.
- Memberikan gambaran mengenai alur kerja API yang akan dibangun.
- Menjelaskan kode serta memberikan rekomendasi perbaikan agar lebih baik dan efisien.
- Membantu dalam proses debugging serta penanganan error.

### Penggunaan Gemini
Penggunaan Gemini dalam submission ini meliputi:
- Membantu menjelaskan error yang muncul serta mendukung proses debugging.
- Membantu membuat kode yang bersifat repetitif, seperti pembuatan schema menggunakan Joi dan pembuatan tabel pada file migrasi.
- Menjelaskan perintah yang digunakan untuk melakukan query tertentu.
- Menjelaskan relasi antar tabel dalam database.
- Memberikan panduan dalam melakukan perbaikan struktur tabel, seperti reset database atau pembaruan melalui penambahan file migrasi baru.

Meskipun menggunakan bantuan AI, seluruh hasil pekerjaan tetap saya pelajari, pahami, dan sesuaikan dengan pemahaman saya sendiri. Saya bertanggung jawab penuh atas isi submission ini.



Oke sekarang kita masuk langkah berikutnya yatiu proses pengerjaan. Saya diminta untuk lolos di setiap pengujian API yang diberikan kepada saya yang akan diuji dengan menggunakna POSTMAN. di pengujian kedua ini ada 2 folder pengujian yaitu [Mandatory] Cache dan [RabbitMQ] feature test. nah sekarang kita masuk kebagian Cache terlebih dahulu. saya akan jelaskan isi dari folder pengujian ini.
1. didalam folder ini terdapat 24 pengujian yang terdiri dari POST GET dan PUT.
2. Untuk pegujian POST terdapat 7 pengujian, dimana hanya 1 pengujian yang tidak memiliki kategory [setup], namanya adalah "Create Application - Verify List Cache Invalidation" dan untuk yang bertuliskan "setup" ini artinya sudah dibuat pda pengujian sebelumnya.
3. Terdapat 2 pengujian PUT yaitu "Update Company - Verify Cache Invalidation" dan "Update Application - Verify Detail and List Cache Invalidation"
4. Tedapat 15 pengujian GET dengan macam macam sekenario, saya akan jelaskan:
a. 2 pengujian GET pertama adalah "Get Company by Id (Cache Miss - First Request)" dan "Get Company by Id (Cache Hit - Second Request)" diuji pada API http://localhost:{{port}}/companies/{{companyId}}
b. 2 GET berikutnya "Get User by Id (Cache Miss - First Request)" dan "Get User by Id (Cache Hit - Second Request)" API = http://localhost:{{port}}/users/{{newUserId}}.
c. 2 GET berikutnya adalah "Get Application by Id (Cache Miss - First Request)" & "Get Application by Id (Cache Hit - Second Request)" API http://localhost:{{port}}/applications/{{applicationId}}
d. 2 GET berikutnya "Get Applications by User (Cache Miss - First Request)" & "Get Applications by User (Cache Hit - Second Request)" API = http://localhost:{{port}}/applications/user/{{userId}}
e. 2 GET berikutnya "Get Applications by Job (Cache Miss - First Request)" & "Get Applications by Job (Cache Hit - Second Request)" API = http://localhost:{{port}}/applications/job/{{applicationJobId}}
f. 2 GET berikutnya "Get Bookmarks by User (Cache Miss - First Request)" & "Get Bookmarks by User (Cache Hit - Second Request)" API = http://localhost:{{port}}/bookmarks
g. 1 GET terakhir adalah "Get Company After Update (Verify Cache Invalidated)" API = http://localhost:{{port}}/companies/{{companyId}}
5. Perlu anda ketahui saya menggunakna expressJS dan Postgre sebagai tools. Namun untuk berkomunikasi dengan database saya menggunakan metode migration Up dan Down. dan untuk node js sendiri saya menggunkana module bukan comonJS.
6. metode query yang saya gunakan adalah adalah variabel query yang berisi object text dan values.

berdasarkan deskripsi tersebut saya ingin adan menjelaskan kepada saya dengan:
1. bahasa yang mudah difahami dan sederahana.
2. jelaskan step by stepnya.
3. berikan saya arahan mana yang harus dihapus atau dipertahankan dan mana yang harus dikurangi atau ditambahkan sebutkan saya nama filenya.
4. Anda boleh meminta isi dari file tertentu yang ada inginkan, ini saya berikan agar anda bisa singkron dengan saya. 