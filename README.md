# PDEV

## PDev é um ajudante pessoal de atividades do dia-a-dia.

### Comandos básicos

```bash
pdev init # Cria um arquivo pdev.json no path definido na variável de ambiente $HOME
```
```bash
pdev add -m "descrição da atividade" -p categoria -d data # grava uma atividade
```

Data pode ser informada de três formas:
* Para colocar a data de hoje, apenas digite um ponto (.) `-d .`
* Para agregar uma data passada relativa ao dia de hoje, você pode
informar há quantos dias aconteceu. `-d 7` 
* E por fim, para especificar uma data, digite-a no padrão BR `-d dd/mm/aa`

```bash
pdev list # lista todas as atividades ordenadas por categoria
```

As informações podem ser listadas por ordem de criação ou agrupadas por categoria.
* Para agrupar por categoria, agregue `-p {categoria}`
* Para listar todas as informações, agregue `-a`
