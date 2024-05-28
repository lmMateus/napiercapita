import path from 'path';
import { fileURLToPath } from 'url';

const _filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(_filename);

const nextConfig = {
  webpack: (config, { isServer }) => {
    // Resolve aliases de caminho
    config.resolve.alias['@'] = path.resolve(__dirname);

    // Certifique-se de que os arquivos .mjs sejam tratados corretamente
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    });

    return config;
  },
};

export default nextConfig;
