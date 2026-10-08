/**
 * PONTO DE INTEGRAÇÃO — Chat (Socket.IO existente).
 *
 * Fluxo esperado:  Cliente → Socket.IO → Backend → sala exclusiva do cliente → Admin.
 * Regra: o cliente NUNCA recebe mensagens de outro cliente; isso é garantido
 * pelo backend (sala exclusiva). A interface só exibe o que chegar nesta conexão.
 *
 * Para conectar: instale `socket.io-client` (autorize a dependência), crie o
 * socket com `auth: { token }` apontando para API_URL e implemente os métodos
 * abaixo. Os nomes dos eventos precisam ser CONFIRMADOS no backend.
 */
export type ChatStatus = "desconectado" | "conectando" | "conectado";

export interface ChatMessage {
  id: string;
  de: "cliente" | "admin";
  texto: string;
  hora: string;
  pendente?: boolean;
}

export interface ChatClient {
  connect(onStatus: (s: ChatStatus) => void, onMessage: (m: ChatMessage) => void): void;
  send(texto: string): void;
  disconnect(): void;
}

/** Implementação vazia: mantém a interface funcionando até o Socket.IO ser ligado. */
export const chatClientPendente: ChatClient = {
  connect(onStatus) {
    onStatus("desconectado");
  },
  send() {
    /* socket.emit("mensagem", { texto }) — evento a confirmar */
  },
  disconnect() {},
};
