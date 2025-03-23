// models.ts (ou outro nome de arquivo)

export interface Sistema {
    titulo: string;
    nome: string;
    versao: string;
  }

  export interface DadosAcesso {
    usuario_id: number;
    nome: string;
    login: string;
    email: string | null;
    token: string;
    avatar: string | null;
    db_config: {
      config_id: number;
    };
    tecnico: string;
    origem_dado_id: number;
    versao: {
      sistema: string;
      bd: string;
    };
    tipo_assinatura: string;
    cetificado: boolean;
  }

  export interface Instituto {
    id: number;
    nome: string;
    url: string;
    ativo: boolean;
    logado: boolean;
    dados_acesso?:  DadosAcesso[];
  }

  export interface Notificacao {
    id: number;
    mensagem: string;
    lida: boolean;
    data: string;
  }

  /**
   * Representa a estrutura principal do seu database.json
   */
  export interface DatabaseJson {
    sistema: Sistema;
    institutos: Instituto[];
    notificacoes: Notificacao[];
  }
