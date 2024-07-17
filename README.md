bagaimana cara installnya ?

Pertamatama anda harus dowload filenya terlebihdahulu dengan menjalankan command.
 ```sh git clone https://github.com/isaacnewton123/Real-Time-Comment

setelah itu , ada harus masuk ke dama directorynya menggunakan command 
'cd Real-Time-Comment'

Setelah Masuk Anda Harus menginstall node js menggunakan command 
'sudo apt install nodejs'

Setelah anda mengintall nodejs , anda harus menginstall npm menggunakan command .
'sudo apt install npm'

setelah terinstall npm , anda harus mengunduh semua berkas yang di butuhkan menggunakan npm dengan memasukan command 
'npm install express socket.io sqlite3 multer'

setelah semua telah terunduh , anda harus mengizinkan port 3000 di vps anda menggunakan command 
'sudo apt install ufw'
'sudo ufw enable'
'sudo ufw allow 3000/tcp'
'sudo ufw status'

Anda akan melihat daftar aturan firewall, termasuk aturan yang baru saja Anda tambahkan untuk mengizinkan akses ke port 3000.

setelah selesai , anda bisa langsung menjalankan perintah 'node server.js' damn , server anda sudah aktif , dan anda bisa melihat website anda dengan mencari di browser http://ip-kalian:3000

selesai
