[VITE]: https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white
[REACT]: https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[REACT-ROUTER]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[HTML5]: https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white
[CSS3]: https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white
[VISUAL_STUDIO_CODE]: https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white
[BOOTSTRAP]: https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white

<h1
    align="center" style="font-weight: bold;">
    WTISC Project 💻 Frontend
</h1>

![vite][VITE]
![react][REACT]
![react-router][REACT-ROUTER]
![html5][HTML5]
![css3][CSS3]
![bootstrap][BOOTSTRAP]
![visual_studio_code][VISUAL_STUDIO_CODE]

<p align="center">
  <a href="#tecnologias">Tecnologias Utilizadas</a> •
  <a href="#ferramentas">Ferramentas Utilizadas</a> •
  <a href="#started">Instalando e Executando</a> • 
  <a href="#prerequisites">Pré-requisitos</a> •
  <a href="#testando">Routes</a> •
  <a href="#colab">Colaboradores</a> 
</p>

<p align="center">
    <img src="client\public\img_wtisc.jpg" alt="Image Example" width="400px">
</p>

## Sobre o WTISC 

Workshop de Tecnologia da Informação do Sertão Central (WTISC) é um evento da Universidade Federal do Ceará Campus Quixadá, realizado anualmente no primeiro semestre do ano, pelo grupo PET – Sistemas de Informação.

O objetivo do evento é promover e difundir o conhecimento sobre as diversas áreas de Tecnologia da Informação, de forma a fortalecer e motivar a formação técnico-profissional, por meio da troca de experiências entre profissionais e acadêmicos.

O WTISC é evento público realizado desde 2008, e consiste na oferta de palestras e minicursos. Buscando apresentar aos alunos/participantes um pouco da realidade do mercado de trabalho.

Nas palestras, os profissionais contam sua experiência profissional e temas acadêmicos: área de atuação, dicas para se tornar um bom profissional, tecnologias utilizadas, além de diversos temas tecnológicos.

Nos minicursos, são apresentados aos alunos/participantes várias técnicas e ferramentas utilizadas em diversas áreas de atuação no mercado e na academia.

## Protótipo
[Figma](https://www.figma.com/design/xf2xmjGqTZf9IlhOY9NNQP/WTISC-2024?node-id=0-1&node-type=canvas&t=b0gJqT6BCPREl30S-0)

## Status do Projeto

🚧 Em desenvolvimento 🚧

## Principais Funcionalidades

- Gerenciamento de usuários
- Inscrição em minicursos e palestras
- Emissão de certificados
- Criação e gerenciamento de produtos


<h2 id="tecnologias"> Tecnologias Utilizadas</h2>

### Frontend

- **React**: Biblioteca JavaScript para a criação de interfaces de usuário interativas e componentes reutilizáveis.

- **Vite**: Ferramenta de build extremamente rápida e moderna para desenvolvimento frontend, otimizando o tempo de recarregamento e build do projeto.

### Estrutura de Marcação

- **HTML5**: Linguagem de marcação padrão para criação da estrutura semântica das páginas web.
Estilização

- **CSS3**: Linguagem de estilo para formatação e layout responsivo de páginas web, suportando animações e design flexível.

- **SCSS**: Framework CSS que facilita a criação de layouts responsivos e componentes pré-estilizados, utilizando a sintaxe SCSS para maior personalização.

### Módulos e Integrações

- **CommonJS (cjs)**: Sistema de módulos que permite a organização e reutilização de código JavaScript no frontend, especialmente em ambientes que suportam ECMAScript mais antigos.


<h2 id="ferramentas"> Ferramentas Utilizadas</h2>

- **Google Chrome DevTools**: Ferramenta de depuração integrada ao navegador para inspecionar, editar e diagnosticar problemas no código frontend.
- **ESLint**: Ferramenta de linting para manter a qualidade e consistência do código JavaScript.
- **Stylelint**: Ferramenta de linting para verificar a qualidade e consistência do código CSS/SCSS.

<h2 id="prerequisites"> Pré-requisitos</h2>

- **Node.js**
- **NPM**
- **Vite**

<h2 id="started"> Instalando e Executando</h2>

Clone o repositório:
```bash
git clone https://github.com/samuelnasc-dev/wtisc-project-front.git
```
Entre no diretório do projeto:
```bash
cd client
```
```bash
npm install
```

<h2 id="testando"> 
    Testando a Aplicação no Navegador e Ferramentas de Desenvolvimento
</h2>
Após configurar e rodar o projeto, você pode testar e depurar o frontend diretamente no navegador utilizando as Ferramentas de Desenvolvimento do Google Chrome. Siga os passos abaixo:

1. **Abra o projeto no navegador**: Acesse ```http://localhost:3000``` (ou a porta configurada) para visualizar a aplicação.

2. **Inspecione os elementos e console**: Clique com o botão direito na página e selecione "Inspecionar" para abrir as Ferramentas de Desenvolvimento do Google Chrome.

3. **Utilize a aba "Console"**: Verifique mensagens de erro e logs importantes diretamente no console para identificar possíveis problemas no código JavaScript.

4. **Aba "Elements"**: Inspecione e edite o HTML e CSS ao vivo para verificar o comportamento da interface.

5. **Testando a responsividade**: Na aba "Device Toolbar", simule diferentes tamanhos de tela para verificar a responsividade da aplicação e como os estilos se adaptam.
​
Aqui está o formato das rotas do frontend, similar ao exemplo do backend:

---

### Frontend Routes

Aqui você encontra uma lista de algumas rotas do frontend e o que cada uma faz:

| Rota | Descrição |
|-------------------------------|-------------------------------------------------------------|
| <kbd>GET /</kbd> | Página inicial com as informações gerais do site |
| <kbd>GET /events</kbd> | Exibe todos os eventos disponíveis |
| <kbd>GET /lectures</kbd> | Lista todas as palestras do evento |
| <kbd>GET /minicourses</kbd> | Apresenta os minicursos disponíveis |
| <kbd>GET /products</kbd> | Mostra os produtos disponíveis para compra |
| <kbd>GET /speakers</kbd> | Exibe a lista de palestrantes |
| <kbd>GET /sponsors</kbd> | Apresenta os patrocinadores do evento |
| <kbd>GET /layout</kbd> | Estrutura geral da aplicação, utilizada em todas as páginas |
| <kbd>GET /lecture/:id</kbd> | Página detalhada de uma palestra específica |
| <kbd>GET /login</kbd> | Página de login para autenticação do usuário |
| <kbd>GET /minicourse/:id</kbd> | Página detalhada de um minicurso específico |
| <kbd>GET /profile</kbd> | Perfil do usuário autenticado |
| <kbd>GET /profile/update</kbd> | Página para atualizar as informações do perfil do usuário |
| <kbd> /programacao.png <kbd> | Página destinada para uma imagem da programação do evento
| <kbd> GET /store <kbf> | Página destinada ao produtos ofertados no evento
| <kbd>GET /register</kbd> | Página de registro para novos usuários |

---


<h2 id="colab">🤝 Colaboradores</h2>

Agradecimento especial a todos aqueles que contribuíram com este projeto!

<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/105515712?v=4" width="100px;" alt="Gustavo Erick Profile Picture"/><br>
        <sub>
          <a href="https://github.com/GustavoErick">Gustavo Erick</a>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/105880814?v=4" width="100px;" alt="Beatriz Nascimento Picture"/><br>
        <sub>
          <a href="https://github.com/beatriznnascimento">Beatriz Nascimento</a>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/101434230?v=4" width="100px;" alt="Foto do Samuel Nascimento"/><br>
        <sub>
         <a href="https://github.com/samuelnasc-dev">Samuel Nascimento</a>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/101982315?v=4" width="100px;" alt="Foto do Elysson Alves"/><br>
        <sub>
          <a href="https://github.com/ElyssonAlvs">Elysson Alves</a>
        </sub>
      </a>
    </td>
        <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/85910011?v=4" width="100px;" alt="Foto do Danilo Gomes"/><br>
        <sub>
          <a href="https://github.com/danilosgomes">Danilo Gomes</a>
        </sub>
      </a>
    </td>
  </tr>
</table>
