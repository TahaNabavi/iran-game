 تمپلیت ایران گیم یا چی؟

این سایت کاملا به دیتابیس متصل شده و تنها با یک دولوپ ساده متونید سایت رو بیارید بالا

ولی ولی تنها چیزی که وقت نکردم روش کار کنم سئو هستش ولی اون هم اشکال نداره با یه دولوپ ساده دیگه میشه بهش اضافه کرد

## نصب و راه اندازی

اول از همه نیاز دارین که پروژه رو به دیتا بیس متصل کنید 
خودتون میتونید با استفاده از فایل موجود در دایرکتوری پروژه هست اضافه کنید یا میتونید با استفاده از این کامند که نیاز به نصب هم هستش استفاده کنید

```bash 
npx prisma db push #in the main directory
```

```bash 
npm install prisma typescript ts-node @types/node --save-dev
```

```bash
DATABASE_URL="mysql://root@localhost:3306/irangame"
```
سپس میتونید پروژه رو ران کنید
[http://localhost:3000](http://localhost:3000)
و ببینید

```bash
npm i
npm run dev
```

و برای لاگین  کردن در سایل باید در فایل
config.js => GOOGLE_CLIENT_ID 
کلاینت کد خودتون رو وارد کنید

استار یادتون نره