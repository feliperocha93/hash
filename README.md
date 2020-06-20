## React-Hash
Jogue algumas partidas: https://react-hash.netlify.app/

Este app é uma versão com novas features do app construído no tutorial de React do site oficial:  
https://pt-br.reactjs.org/tutorial/tutorial.html

#### Pontos interessantes abordados no tutorial:
- create-react-app
- props
- state
- novas features ES6+

Obs: A parte de histórico de jogadas está comentada pois achei que estava poluíndo a tela do meu joguinho rs Porém, funciona perfeitamente.

#### Features que implementei no app original:
- Quebrar app em componentes menores :heavy_check_mark:
- Criar parte de service :x:  
*Task removida porque não achei errado manter o método calculateWinner no componente*
- Reescrever o componente Board para utilizar 2 loops para fazer os quadrados, em vez de deixá-los hardcoded :heavy_check_mark:  
*Ordem da taks alterada, próxima task depende dessa* 
- Mostrar a localização de cada jogada no formato (col,row), para cada jogada no histórico :heavy_check_mark:
- Adicionar um botão de toggle que lhe permita ordenar os jogadas em ordem ascendente ou descendente :heavy_check_mark:
- Quando alguém ganhar, destaque os 3 quadrados que causaram a vitória :heavy_check_mark:
- Quando ninguém ganhar, exiba uma mensagem informando que o resultado foi um empate. :heavy_check_mark:
- Adicionar controles de jogo (placar, reiniciar placar, reiniciar partida (move 0)) :heavy_check_mark:
- Finalizar a estilização :heavy_check_mark:
