import * as yup from 'yup';

export const contactSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(3, 'Name should be at least 3 characters long')
    .max(20, 'Name should be less than 20 characters long'),

  number: yup
    .string()
    .required('Phone number is required')
    .min(13, 'Number should be at least 13 characters long (including country code)')
    .max(15, 'Number should be less than 15 characters long')
    .matches(/^\+?[1-9][0-9]{7,14}$/, 'Number should be numeric'),

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

function isValidFileType(fileName: string, fileType: keyof typeof supportedFormats) {
  return fileName && supportedFormats[fileType].includes(fileName.split('.').pop()!.toLowerCase());
}

function isValidFileSize(fileSize: number) {
  return fileSize && fileSize <= MAX_FILE_SIZE;
}


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
    .min(6, 'Designation should be at least 6 characters long')
    .max(40, 'Designation should be less than 40 characters long'),

  photo: yup
    .mixed()
    .test('required', 'Photo is required', function (value: any) {
      if (value) return true;
      return false;
    })
    .test('fileSize', 'File Size is too large', function (value: any) {
      if (value.length > 0) {
        const fileSize = value[0]?.size;
        if (isValidFileSize(fileSize)) return true;
      }
    })
    .test('fileType', 'Unsupported File Format', function (value: any) {
      if (value.length > 0) {
        const fileName = value[0]?.name;
        if (isValidFileType(fileName, 'image')) return true;
      }
    }),

  message: yup
    .string()
    .required('Message is required')
    .min(3, 'Message should be at least 3 characters long')
    .max(100, 'Message should be less than or equals to 100 characters long'),
});