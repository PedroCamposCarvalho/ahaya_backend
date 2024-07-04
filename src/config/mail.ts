interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: 'ses',

  defaults: {
    from: {
      email: 'suporte@pluma.tech',
      name: 'Suporte Pluma',
    },
  },
} as IMailConfig;
