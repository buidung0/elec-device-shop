import icons from './icons';
const { AiFillStar, AiOutlineStar } = icons;
export const createSlug = (string) => {
  return string
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .split(' ')
    .join('-');
};

export const formatMoney = (number) => Number(number?.toFixed(1)).toLocaleString();
// export const formatMoney = (number) => Number(number).toFixed(1).toLocaleString();

export const renderStarFromNumber = (number, size) => {
  if (!Number(number)) return;
  const stars = [];
  number = Math.round(number);
  for (let i = 0; i < +number; i++) stars.push(<AiFillStar color="orange" size={size || 16} />);
  for (let i = 5; i > +number; i--) stars.push(<AiOutlineStar color="orange" size={size || 16} />);
  return stars;
};

export function secondsToHms(d) {
  d = Number(d) / 1000;
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);
  return { h, m, s };
}

export const validate = (payload, setInvalidFields) => {
  let invalids = 0;
  const formatPayload = Object.entries(payload);
  for (let arr of formatPayload) {
    if (arr[1].trim() === '') {
      invalids++;
      setInvalidFields((prev) => [...prev, { name: arr[0], message: 'Require this field.' }]);
    }
  }
  return invalids;
};
// for (let arr of formatPayload) {
//   switch (arr[0]) {
//     case 'email':
//       const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!arr[1].match(regex)) {
//         invalids++;
//         setInvalidFields((prev) => [...prev, { name: arr[0], message: 'Email invalid.' }]);
//       }
//       break;
//     case 'password':
//       if (arr[1].length < 6) {
//         invalids++;
//         setInvalidFields((prev) => [
//           ...prev,
//           { name: arr[0], message: 'Password must be at least 6 characters long.' },
//         ]);
//       }
//       break;
//     default:
//       break;
//   }
// }

export const validate1 = (payload, setInvalidFields) => {
  let invalids = 0;
  const formatPayload = Object.entries(payload);
  for (let arr of formatPayload) {
    if (typeof arr[1] === 'string' && arr[1].trim() === '') {
      invalids++;
      setInvalidFields((prev) => [...prev, { name: arr[0], message: 'Require this field.' }]);
    }
  }
  return invalids;
};

export const formatPrice = (number) => Math.round(number / 1000) * 1000;

export const generateRange = (start, end) => {
  const startNum = +start;
  const endNum = +end;

  const length = endNum - startNum + 1;
  return Array.from({ length }, (_, index) => startNum + index);
};

// Convert file to base64 string
export function getBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject('File is null or undefined');
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}