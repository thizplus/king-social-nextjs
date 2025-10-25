// constants/editor.ts

export const DEFAULT_EDITOR_PLACEHOLDER = 'เขียนเนื้อหาของคุณที่นี่...';

export const EDITOR_EXTENSIONS_CONFIG = {
  image: {
    inline: false,
    allowBase64: false,
    HTMLAttributes: {
      class: 'tiptap-image',
    },
  },
  link: {
    openOnClick: false,
    HTMLAttributes: {
      class: 'tiptap-link',
    },
  },
  textAlign: {
    types: ['heading', 'paragraph'],
  },
  highlight: {
    multicolor: true,
  },
  table: {
    resizable: true,
    HTMLAttributes: {
      class: 'tiptap-table',
    },
  },
  tableRow: {
    HTMLAttributes: {
      class: 'tiptap-table-row',
    },
  },
  tableHeader: {
    HTMLAttributes: {
      class: 'tiptap-table-header',
    },
  },
  tableCell: {
    HTMLAttributes: {
      class: 'tiptap-table-cell',
    },
  },
};

export const TEXT_COLORS = [
  { color: '#000000', label: 'ดำ' },
  { color: '#374151', label: 'เทาเข้ม' },
  { color: '#6B7280', label: 'เทา' },
  { color: '#9CA3AF', label: 'เทาอ่อน' },
  { color: '#EF4444', label: 'แดง' },
  { color: '#F97316', label: 'ส้ม' },
  { color: '#EAB308', label: 'เหลือง' },
  { color: '#22C55E', label: 'เขียว' },
  { color: '#3B82F6', label: 'ฟ้า' },
  { color: '#6366F1', label: 'ม่วงฟ้า' },
  { color: '#A855F7', label: 'ม่วง' },
  { color: '#EC4899', label: 'ชมพู' },
  { color: '#DC2626', label: 'แดงเข้ม' },
  { color: '#EA580C', label: 'ส้มเข้ม' },
  { color: '#CA8A04', label: 'เหลืองเข้ม' },
  { color: '#16A34A', label: 'เขียวเข้ม' },
  { color: '#2563EB', label: 'ฟ้าเข้ม' },
  { color: '#4F46E5', label: 'ม่วงฟ้าเข้ม' },
  { color: '#9333EA', label: 'ม่วงเข้ม' },
  { color: '#DB2777', label: 'ชมพูเข้ม' },
  { color: '#7F1D1D', label: 'แดงแก่' },
  { color: '#9A3412', label: 'ส้มแก่' },
  { color: '#92400E', label: 'เหลืองแก่' },
  { color: '#14532D', label: 'เขียวแก่' },
  { color: '#1E3A8A', label: 'ฟ้าแก่' },
  { color: '#312E81', label: 'ม่วงฟ้าแก่' },
  { color: '#581C87', label: 'ม่วงแก่' },
  { color: '#831843', label: 'ชมพูแก่' },
  { color: '#FFFFFF', label: 'ขาว' },
  { color: '#F3F4F6', label: 'ขาวเทา' },
  { color: '#E5E7EB', label: 'เทาอ่อนมาก' },
  { color: '#D1D5DB', label: 'เทาอ่อน' },
];