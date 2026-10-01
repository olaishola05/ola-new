import * as yup from 'yup';

export const contactSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(3, 'Name should be at least 3 characters long')
    .max(20, 'Name should be less than 20 characters long'),

  email:
    yup.string()
      .required('Email is required')
      .email('Email is invalid')
      .matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'Email is invalid'),

  subject: yup
    .string()
    .required('Subject is required')
    .min(3, 'Subject should be at least 3 characters long')
    .max(100, 'Subject should be less than 20 characters long')
    .matches(/^[a-zA-Z]/, 'Subject should be alphanumeric'),

  message: yup
    .string()
    .required('Message is required')
    .min(3, 'Message should be at least 3 characters long')
    .max(500, 'Message should be less than 100 characters long')
});

const MAX_FILE_SIZE = 2000000; // 2MB

const supportedFormats: { [key: string]: string[] } = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] };

function isValidFileType(fileName: string, fileType: keyof typeof supportedFormats): boolean {
  return Boolean(fileName && supportedFormats[fileType].includes(fileName.split('.').pop()!.toLowerCase()));
}

function isValidFileSize(fileSize: number): boolean {
  return Boolean(fileSize && fileSize <= MAX_FILE_SIZE);
}


export const RELATIONSHIP_OPTIONS = [
  { value: 'colleague', label: 'Same Team / Colleague' },
  { value: 'client', label: 'Client / Product Owner' },
  { value: 'mentee', label: 'Mentee / Student' },
  { value: 'opensource', label: 'Open Source Collaboration' },
  { value: 'reference', label: 'Professional Reference' },
] as const;

export type RelationshipValue = typeof RELATIONSHIP_OPTIONS[number]['value'];

export const TestimonialSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(3, 'Name should be at least 3 characters long')
    .max(20, 'Name should be less than 20 characters long'),

  email:
    yup.string()
      .required('Email is required')
      .email('Email is invalid')
      .matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'Email is invalid'),

  jobTitle: yup
    .string()
    .required('Job Title is required')
    .min(3, 'Job Title should be at least 3 characters long')
    .max(40, 'Job Title should be less than 40 characters long'),

  relationship: yup
    .string()
    .required('Please select how you know Oladipupo')
    .oneOf(
      RELATIONSHIP_OPTIONS.map((o) => o.value),
      'Please select a valid relationship'
    ),

  linkedinUrl: yup
    .string()
    .optional()
    .test('valid-url', 'Please enter a valid LinkedIn URL', function (value) {
      if (!value || value.trim() === '') return true;
      return value.startsWith('https://www.linkedin.com/') || value.startsWith('https://linkedin.com/');
    }),

  photo: yup
    .mixed()
    .optional()
    .test('fileSize', 'File is too large (max 2 MB)', function (value: any) {
      if (!value || value.length === 0) return true;
      const fileSize = value[0]?.size;
      return isValidFileSize(fileSize);
    })
    .test('fileType', 'Unsupported format — use JPG, PNG, or WebP', function (value: any) {
      if (!value || value.length === 0) return true;
      const fileName = value[0]?.name;
      return isValidFileType(fileName, 'image');
    }),

  message: yup
    .string()
    .required('Message is required')
    .min(3, 'Message should be at least 3 characters long')
    .max(200, 'Message should be less than or equal to 200 characters long'),
});

export const subscribeSchema = yup.object().shape({
  email:
    yup.string()
      .required('Email is required')
      .email('Email is invalid')
      .matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'Email is invalid'),
});