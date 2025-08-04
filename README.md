# Lab 2: SQL Injection Prevention

## คำอธิบาย
Lab นี้เป็นตัวอย่างการสาธิตช่องโหว่ SQL Injection และวิธีการป้องกัน โดยแสดงให้เห็นความแตกต่างระหว่างการเขียนโค้ดที่เสี่ยงต่อการโจมตีและการเขียนโค้ดที่ปลอดภัย

## ไฟล์ที่สร้างขึ้น

### 1. `index.html`
- หน้าเว็บหลักที่แสดงตัวอย่างโค้ดและฟอร์มทดสอบ
- แสดงโค้ดที่เสี่ยงต่อ SQL Injection และโค้ดที่ปลอดภัย
- มีฟอร์มสำหรับทดสอบการโจมตี SQL Injection

### 2. `styles.css`
- ไฟล์ CSS สำหรับการจัดรูปแบบ
- ใช้สีและไอคอนเพื่อแยกแยะระหว่างโค้ดที่เสี่ยงและปลอดภัย
- Responsive design สำหรับการแสดงผลบนอุปกรณ์ต่างๆ

### 3. `script.js`
- ไฟล์ JavaScript สำหรับฟังก์ชันการทำงาน
- จำลองฐานข้อมูลผู้ใช้
- จำลองการทำงานของ query ที่เสี่ยงและปลอดภัย
- แสดงผลลัพธ์การทดสอบ

### 4. `package.json`
- ไฟล์สำหรับการจัดการ dependencies
- มีคำสั่งสำหรับการรันเซิร์ฟเวอร์

### 5. `README.md`
- ไฟล์คำอธิบายการใช้งาน (ไฟล์นี้)

## วิธีการใช้งาน

### 1. รันเซิร์ฟเวอร์
```bash
# ใช้ Python
python -m http.server 8000

# หรือใช้ Node.js
npx http-server

# หรือใช้ npm script
npm start
```

### 2. เปิดเว็บเบราว์เซอร์
ไปที่ `http://localhost:8000`

### 3. ทดสอบ SQL Injection
1. ใส่ username: `admin' OR '1'='1' --`
2. ใส่ password: `anything`
3. กดปุ่ม "Vulnerable Query" เพื่อดูการโจมตีสำเร็จ
4. กดปุ่ม "Secure Query" เพื่อดูการป้องกัน

## ตัวอย่างการโจมตี SQL Injection

### Payload ที่ใช้ทดสอบ:
- `admin' OR '1'='1' --`
- `admin' --`
- `' OR 1=1 --`
- `'; DROP TABLE users; --`

### ผลลัพธ์ที่คาดหวัง:
- **Vulnerable Query**: จะแสดงข้อมูลผู้ใช้ทั้งหมดเมื่อใช้ payload ข้างต้น
- **Secure Query**: จะไม่สามารถเข้าสู่ระบบได้และป้องกันการโจมตี

## วิธีการป้องกัน SQL Injection

1. **ใช้ Parameterized Queries**
   ```javascript
   // ไม่ปลอดภัย
   const query = `SELECT * FROM users WHERE username = '${username}'`;
   
   // ปลอดภัย
   const query = 'SELECT * FROM users WHERE username = ?';
   executeQuery(query, [username]);
   ```

2. **Input Validation**
   - ตรวจสอบรูปแบบข้อมูลที่รับเข้ามา
   - ใช้ whitelist สำหรับข้อมูลที่อนุญาต

3. **Escape Special Characters**
   - ใช้ฟังก์ชัน escape สำหรับข้อมูลที่รับเข้ามา

4. **ใช้ ORM (Object-Relational Mapping)**
   - ใช้ ORM ที่มี built-in protection

## Keyboard Shortcuts
- `Ctrl + 1`: ทดสอบ Vulnerable Query
- `Ctrl + 2`: ทดสอบ Secure Query

## หมายเหตุ
- Lab นี้เป็นเพียงการจำลองเพื่อการศึกษา
- ไม่ควรใช้ในระบบจริงโดยไม่มีการปรับปรุงความปลอดภัยเพิ่มเติม
- ข้อมูลผู้ใช้เป็นข้อมูลจำลองเท่านั้น

## การพัฒนาเพิ่มเติม
- เพิ่มตัวอย่างการโจมตีอื่นๆ
- เพิ่มการแสดงผลแบบ real-time
- เพิ่มการบันทึก log การทดสอบ
- เพิ่มการทดสอบกับฐานข้อมูลจริง 