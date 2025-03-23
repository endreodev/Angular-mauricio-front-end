import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, throwError, of, Observable } from 'rxjs';
import { tap, catchError, delay } from 'rxjs/operators';
import {
  DatabaseJson,
  Sistema,
  Instituto,
  DadosAcesso,
  Notificacao
} from '../model/models'; // Ajuste o caminho ao seu arquivo

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  /**
   * Caminho do arquivo JSON. Ajuste conforme sua estrutura de pastas.
   * Ex.: './assets/database.json' ou './database.json'
   */
  private readonly dataUrl = 'assets/data/database.json';

  /**
   * BehaviorSubject mantém o estado atual dos dados e notifica assinantes
   * sempre que houver alteração.
   */
  private dataSubject = new BehaviorSubject<DatabaseJson | null>(null);

  /**
   * Exponha o Observable para que componentes possam se inscrever
   * e receber atualizações a qualquer momento.
   */
  public data$ = this.dataSubject.asObservable();

  constructor(private http: HttpClient) {
    // Se quiser carregar ao instanciar o serviço, descomente:
    // this.init().subscribe();
  }

  /**
   * Método público que carrega o JSON do arquivo externo e armazena em dataSubject.
   * Chame este método (por exemplo, no AppComponent ou em um Guard) para garantir
   * que os dados sejam carregados antes de usar os outros métodos de CRUD.
   */
  public init(): Observable<DatabaseJson> {
    return this.http.get<DatabaseJson>(this.dataUrl).pipe(
      tap(data => {
        this.dataSubject.next(data);
      }),
      catchError(error => {
        console.error('Erro ao carregar o arquivo JSON:', error);
        return throwError(() => 'Erro ao carregar dados do JSON.');
      })
    );
  }

  /**
   * Retorna o valor atual dos dados (sincronicamente), se já foram carregados.
   * Caso contrário, retorna null.
   */
  public getDataSnapshot(): DatabaseJson | null {
    return this.dataSubject.value;
  }

  // ================== SISTEMA ===================
  /**
   * Retorna o sistema completo (com título, nome e versão).
   */
  public getSistema(): Observable<Sistema> {
    const data = this.dataSubject.value;
    if (!data) {
      return throwError(() => 'Dados não carregados. Chame init() primeiro.');
    }
    return of(data.sistema).pipe(delay(500));
  }

  /**
   * Atualiza o objeto "sistema" (partial update).
   */
  public updateSistema(update: Partial<Sistema>): Observable<Sistema> {
    const data = this.dataSubject.value;
    if (!data) {
      return throwError(() => 'Dados não carregados. Chame init() primeiro.');
    }

    data.sistema = { ...data.sistema, ...update };
    this.dataSubject.next(data); // Notifica quem estiver inscrito em data$
    return of(data.sistema).pipe(delay(500));
  }

  // ================== INSTITUTOS ===================
  public getInstitutos(): Observable<Instituto[]> {
    const data = this.dataSubject.value;
    if (!data) {
      return throwError(() => 'Dados não carregados. Chame init() primeiro.');
    }
    return of([...data.institutos]).pipe(delay(500));
  }

  public getInstitutoById(id: number): Observable<Instituto> {
    const data = this.dataSubject.value;
    if (!data) {
      return throwError(() => 'Dados não carregados. Chame init() primeiro.');
    }
    const instituto = data.institutos.find(i => i.id === id);
    if (!instituto) return throwError(() => 'Instituto não encontrado.');

    return of(instituto).pipe(delay(500));
  }

  public addInstituto(instituto: Omit<Instituto, 'id'>): Observable<Instituto> {
    const data = this.dataSubject.value;
    if (!data) {
      return throwError(() => 'Dados não carregados. Chame init() primeiro.');
    }

    const newInstituto: Instituto = {
      id: this.generateId(),
      ...instituto
    };
    data.institutos.push(newInstituto);
    this.dataSubject.next(data);

    return of(newInstituto).pipe(delay(500));
  }

  public updateInstituto(
    id: number,
    update: Partial<Instituto>
  ): Observable<Instituto> {
    const data = this.dataSubject.value;
    if (!data) {
      return throwError(() => 'Dados não carregados. Chame init() primeiro.');
    }

    const index = data.institutos.findIndex(i => i.id === id);
    if (index === -1) return throwError(() => 'Instituto não encontrado.');

    data.institutos[index] = { ...data.institutos[index], ...update };
    this.dataSubject.next(data);

    return of(data.institutos[index]).pipe(delay(500));
  }

  public deleteInstituto(id: number): Observable<void> {
    const data = this.dataSubject.value;
    if (!data) {
      return throwError(() => 'Dados não carregados. Chame init() primeiro.');
    }

    data.institutos = data.institutos.filter(i => i.id !== id);
    this.dataSubject.next(data);

    return of(undefined).pipe(delay(500));
  }

  // ================== DADOS ACESSO ===================
  public getDadosAcessoByInstitutoId(institutoId: number): Observable<DadosAcesso[]> {
    const data = this.dataSubject.value;
    if (!data) {
      return throwError(() => 'Dados não carregados. Chame init() primeiro.');
    }

    const instituto = data.institutos.find(i => i.id === institutoId);
    if (!instituto) {
      return throwError(() => 'Instituto não encontrado.');
    }

    // Garanta que 'dados_acesso' seja um array
    return of([...(instituto.dados_acesso || [])]).pipe(delay(500));
  }

  public addDadosAcesso(
    institutoId: number,
    dados: Omit<DadosAcesso, 'usuario_id'>
  ): Observable<DadosAcesso> {
    const data = this.dataSubject.value;
    if (!data) {
      return throwError(() => 'Dados não carregados. Chame init() primeiro.');
    }

    const instituto = data.institutos.find(i => i.id === institutoId);
    if (!instituto) {
      return throwError(() => 'Instituto não encontrado.');
    }

    // Inicializa 'dados_acesso' como array vazio se for undefined
    if (!instituto.dados_acesso) {
      instituto.dados_acesso = [];
    }

    const newDadosAcesso: DadosAcesso = {
      usuario_id: this.generateId(),
      ...dados,
    };

    // Adiciona o novo dado ao array 'dados_acesso'
    instituto.dados_acesso.push(newDadosAcesso);

    // Atualiza o estado global
    this.dataSubject.next(data);

    return of(newDadosAcesso).pipe(delay(500));
  }

  // ================== NOTIFICAÇÕES ===================
  public getNotificacoes(): Observable<Notificacao[]> {
    const data = this.dataSubject.value;
    if (!data) {
      return throwError(() => 'Dados não carregados. Chame init() primeiro.');
    }
    return of([...data.notificacoes]).pipe(delay(500));
  }

  public addNotificacao(
    notificacao: Omit<Notificacao, 'id'>
  ): Observable<Notificacao> {
    const data = this.dataSubject.value;
    if (!data) {
      return throwError(() => 'Dados não carregados. Chame init() primeiro.');
    }

    const newNotificacao: Notificacao = {
      id: this.generateId(),
      ...notificacao
    };
    data.notificacoes.push(newNotificacao);
    this.dataSubject.next(data);

    return of(newNotificacao).pipe(delay(500));
  }

  public updateNotificacao(
    id: number,
    update: Partial<Notificacao>
  ): Observable<Notificacao> {
    const data = this.dataSubject.value;
    if (!data) {
      return throwError(() => 'Dados não carregados. Chame init() primeiro.');
    }

    const index = data.notificacoes.findIndex(n => n.id === id);
    if (index === -1) {
      return throwError(() => 'Notificação não encontrada.');
    }

    data.notificacoes[index] = { ...data.notificacoes[index], ...update };
    this.dataSubject.next(data);

    return of(data.notificacoes[index]).pipe(delay(500));
  }

  public deleteNotificacao(id: number): Observable<void> {
    const data = this.dataSubject.value;
    if (!data) {
      return throwError(() => 'Dados não carregados. Chame init() primeiro.');
    }

    data.notificacoes = data.notificacoes.filter(n => n.id !== id);
    this.dataSubject.next(data);

    return of(undefined).pipe(delay(500));
  }

  /**
   * Gera um ID simples aleatório para simular criação de registro.
   */
  private generateId(): number {
    return Math.floor(Math.random() * 1000000);
  }
}
