// lib/utils/formatTime.ts

/**
 * แปลง timestamp เป็นรูปแบบเวลาที่ผ่านมา (ภาษาไทย)
 * @param dateString - ISO string หรือ date string
 * @returns string เช่น "5 นาทีที่แล้ว", "2 ชั่วโมงที่แล้ว", "3 วันที่แล้ว"
 */
export const formatTimestamp = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();

  const minutes = Math.floor(diffInMs / (1000 * 60));
  const hours = Math.floor(diffInMs / (1000 * 60 * 60));
  const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (minutes < 1) {
    return 'เมื่อสักครู่';
  } else if (minutes < 60) {
    return `${minutes} นาทีที่แล้ว`;
  } else if (hours < 24) {
    return `${hours} ชั่วโมงที่แล้ว`;
  } else if (days < 7) {
    return `${days} วันที่แล้ว`;
  } else if (weeks < 4) {
    return `${weeks} สัปดาห์ที่แล้ว`;
  } else if (months < 12) {
    return `${months} เดือนที่แล้ว`;
  } else {
    return `${years} ปีที่แล้ว`;
  }
};

/**
 * แปลง timestamp เป็นรูปแบบสั้น
 * @param dateString - ISO string หรือ date string
 * @returns string เช่น "5 นาที", "2 ช.ม.", "3 วัน"
 */
export const formatTimestampShort = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();

  const minutes = Math.floor(diffInMs / (1000 * 60));
  const hours = Math.floor(diffInMs / (1000 * 60 * 60));
  const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(days / 7);

  if (minutes < 1) {
    return 'เมื่อสักครู่';
  } else if (minutes < 60) {
    return `${minutes} นาที`;
  } else if (hours < 24) {
    return `${hours} ช.ม.`;
  } else if (days < 7) {
    return `${days} วัน`;
  } else {
    return `${weeks} สัปดาห์`;
  }
};

/**
 * แปลง timestamp เป็นรูปแบบวันที่ธรรมดา
 * @param dateString - ISO string หรือ date string
 * @returns string เช่น "12 มกราคม 2025"
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const thaiMonths = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];

  const day = date.getDate();
  const month = thaiMonths[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

/**
 * แปลง timestamp เป็นรูปแบบวันที่และเวลา
 * @param dateString - ISO string หรือ date string
 * @returns string เช่น "12 มกราคม 2025 เวลา 14:30"
 */
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  const dateStr = formatDate(dateString);
  const timeStr = date.toLocaleTimeString('th-TH', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return `${dateStr} เวลา ${timeStr}`;
};