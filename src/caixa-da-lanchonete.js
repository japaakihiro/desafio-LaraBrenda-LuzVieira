class CaixaDaLanchonete {
  constructor() {
    this.cardapio = {
      cafe: { descricao: 'Café', valor: 3.00 },
      chantily: { descricao: 'Chantily (extra do Café)', valor: 1.50 },
      suco: { descricao: 'Suco Natural', valor: 6.20 },
      sanduiche: { descricao: 'Sanduíche', valor: 6.50 },
      queijo: { descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
      salgado: { descricao: 'Salgado', valor: 7.25 },
      combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
      combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.50 }
    };
    this.pagamentoMultipliers = {
      dinheiro: 0.95,
      credito: 1.03,
      debito: 1
    };
  }

  formatarResultado(resultado) {
    return resultado.replace(/\xa0/g, " ");
  }

  calcularValorDaCompra(formaDePagamento, itens) {
    const formasValidas = ['debito', 'credito', 'dinheiro'];

    if (!formasValidas.includes(formaDePagamento)) {
      return "Forma de pagamento inválida!";
    }

    let total = 0;
    const itensPrincipais = new Set();
    const extras = new Map();

    for (const item of itens) {
      const [codigo, quantidade] = item.split(',');
      const itemCardapio = this.cardapio[codigo];

      if(!itemCardapio){
        return "Item inválido!";
      }

      if (quantidade <= 0) {
        return "Quantidade inválida!";
      }

      if (['chantily', 'queijo'].includes(codigo)) {
        const principal = codigo === 'chantily' ? 'cafe' : 'sanduiche';
        if (!itensPrincipais.has(principal)) {
          return "Item extra não pode ser pedido sem o principal";
        }
        extras.set(codigo, quantidade);
      } else {
        itensPrincipais.add(codigo);
        total += itemCardapio.valor * quantidade;
      }
    }

    for (const [codigo, quantidade] of extras) {
      total += this.cardapio[codigo].valor * quantidade;
    }

    if (itensPrincipais.size === 0) {
      return "Não há itens no carrinho de compra!";
    }

    total *= this.pagamentoMultipliers[formaDePagamento];

    return this.formatarResultado(`R$ ${total.toFixed(2).replace('.', ',')}`);
  }
}

export { CaixaDaLanchonete };
