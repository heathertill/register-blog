export default require(`./${process.env.NODE_ENV}`).default;

// default is default extention. here it will be .ts

// NODE_ENV will be value 'production' or 'development' 
// depending on npm run dev or npm run start
