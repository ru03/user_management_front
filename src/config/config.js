import dev from './dev';
import prod from './prod';

const config = process.env.NODE_ENV !== ('prod' || 'production') ? dev : prod;

export default config;
