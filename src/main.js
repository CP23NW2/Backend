// import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
// import Vue from 'vue';
import VueHtmlToPaper from 'vue-html-to-paper';
import router from './Router/index.js';
import { createApp } from 'vue';
const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css'
  ],
  timeout: 10000, // default timeout before the print window appears
  autoClose: false, // if false, the window will not close after printing
  windowTitle: window.document.title, // override the window title
}



// const i18n = createI18n({
//     locale: 'en',
//     messages: {
//       en: {
//         home: {
//           register: 'REGISTER',
//           login: 'LOGIN',
//           fulfill: 'Fulfill your cybersecurity journey from learning as a complete novice, practice with intensive courses, compete in challenges and land on a real job in a real cybersecurity career.'
//         },
//         user: {
//           language: '100% Thai Languages',
//           theoretica: 'Theoretical and Practical Learning',
//           uptodate: 'Up-to-date Content',
//           flexible: 'Flexible Schedule',
//           related: 'Related to Cybersecurity Blueprint',
//           develope: 'Developed by industry expertise'
//         },
//         enterprise: {
//           comprehensive: 'Comprehensive Content for develope',
//           customizable: 'Customizable course',
//           user: 'User Management',
//           performance: 'Performance Tracking',
//           summary: 'Summary Report',
//           job: 'Job Posting',
//           customize: 'Customize exam for candidate',
//           realtime: 'Realtime test result',
//           feature: 'Feature from feedback'
//         }
//       },
//       th: {
//         home: {
//           register: 'ลงทะเบียน',
//           login: 'เข้าสู่ระบบ',
//           fulfill: 'เติมเต็มเส้นทางด้าน Cybersecurity ของคุณ โดยจะฝึกฝนตั้งแต่พื้นฐานไปสู่หลักสูตรเร่งรัด ซึ่งจะมีการแข่งขันท้าทายความสามารถ นอกจากนี้ยังสามารถนำไปใช้งานได้จริงในสายอาชีพ Cybersecurity'
//         },
//         user: {
//           language: '100% ภาษาไทย',
//           theoretica: 'การเรียนรู้ในเชิงทฤษฎีและปฏิบัติ',
//           uptodate: 'เนื้อหาที่ทันสมัย',
//           flexible: 'ตารางเวลาที่ยืดหยุ่น',
//           related: 'เกี่ยวข้องกับ Cybersecurity Blueprint',
//           develope: 'พัฒนาโดยผู้เชี่ยวชาญในอุตสาหกรรม'
//         },
//         enterprise: {
//           comprehensive: 'เนื้อหาที่ครอบคลุมการพัฒนา',
//           customizable: 'หลักสูตรที่ปรับแต่งได้',
//           user: 'การจัดการผู้ใช้',
//           performance: 'การติดตามประสิทธิภาพ',
//           summary: 'สรุปรายงาน',
//           job: 'ประกาศรับสมัครงาน',
//           customize: 'ปรับแต่งข้อสอบสำหรับผู้สมัคร',
//           realtime: 'ผลการทดสอบตามเวลาจริง',
//           feature: 'เสนอแนะคุณสมบัติ'
//         }
//       }
//     }
//   })
  const app = createApp(App)
  // app.use(i18n)
  app.use(VueHtmlToPaper, options)
  app.use(VueHtmlToPaper)
  app.use(router)
  app.mount('#app')
