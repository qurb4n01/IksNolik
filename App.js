import React, {useState} from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Vibration } from 'react-native';

const DrawBoard = ({board, Play}) => {
  return(
    <View style={styles.boardContainer}>
      {board.map((element,index)=>(
        <TouchableOpacity
          key={index}
          onPress={()=>Play(index)}                
          style={styles.square}
        >
          <Text>{element}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};


const App = () => {
  const [board, setBoard] = useState([null,null,null,null,null,null,null,null,null])
  const [current_player, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState (null);
  const [gameOver, setGameOver] = useState(false);

  const Play = (index) => {
    if(board[index]!=null || gameOver){
      Vibration.vibrate(100);
    }else{
      if(gameOver==false){
        const newBoard = [...board];
        newBoard[index] = current_player; 
        setBoard(newBoard);
        setCurrentPlayer(current_player=="X" ? "O" : "X");
      }
    }
  }

  const CheckVertical = () => {
    if((board[0]=="X" && board[3]=="X" && board[6]=="X") || (board[0]=="O" && board[3]=="O" && board[6]=="O")){
      setWinner(current_player=="X" ? "O" : "X");
      setGameOver(true);

    }
    if((board[1]=="X" && board[4]=="X" && board[7]=="X") || (board[1]=="O" && board[4]=="O" && board[7]=="O")){
      setWinner(current_player=="X" ? "O" : "X");
      setGameOver(true);

    }
    if((board[2]=="X" && board[5]=="X" && board[8]=="X") || (board[2]=="O" && board[5]=="O" && board[8]=="O")){
      setWinner(current_player=="X" ? "O" : "X");
      setGameOver(true);

    }
  }

  const CheckDiagonal = () => {
    if((board[0]=="X" && board[4]=="X" && board[8]=="X") || (board[0]=="O" && board[4]=="O" && board[8]=="O")){
      setWinner(current_player=="X" ? "O" : "X");
      setGameOver(true);
 
    }
    if((board[2]=="X" && board[4]=="X" && board[6]=="X") || (board[2]=="O" && board[4]=="O" && board[6]=="O")){
      setWinner(current_player=="X" ? "O" : "X");
      setGameOver(true);
 
    }
  }

  const CheckHorizontal = () => {
    if((board[0]=="X" && board[1]=="X" && board[2]=="X") || (board[0]=="O" && board[1]=="O" && board[2]=="O")){
      setWinner(current_player=="X" ? "O" : "X");
      setGameOver(true);

    }
    if((board[3]=="X" && board[4]=="X" && board[5]=="X") || (board[3]=="O" && board[4]=="O" && board[5]=="O")){
      setWinner(current_player=="X" ? "O" : "X");
      setGameOver(true);

    }
    if((board[6]=="X" && board[7]=="X" && board[8]=="X") || (board[6]=="O" && board[7]=="O" && board[8]=="O")){
      setWinner(current_player=="X" ? "O" : "X");
      setGameOver(true);

    }
  }

  const CheckWinner = () => {
    CheckHorizontal();
    CheckVertical();
    CheckDiagonal();
  }

  const CheckDraw = () => {
    if(board[0]!=null && board[1]!=null && board[2]!=null && board[3]!=null && board[4]!=null && board[5]!=null && board[6]!=null && board[7]!=null && board[8]!=null){
      setGameOver(true);
    }
  }

  const restartGame = () => {
    setBoard([null, null, null, null, null, null, null, null, null]);
    setCurrentPlayer("X");
    setWinner(null);
    setGameOver(false);
  }
  
  return(
    <View style={styles.container}>
      <View style={styles.gameNameContainer}>
        <Text style={styles.gameNameText}>İks-Nolik</Text>
      </View>

      <DrawBoard board={board} Play={Play}/>

      {(gameOver!=true) && (
        <Text style={{marginTop:20}}>{current_player}-in sırası</Text>
      )}

      <CheckWinner/>
      <CheckDraw/>
      {winner != null && (
        <Text style={{ marginTop: 20 }}>{winner} Qazandı!</Text>
      )}
      {(winner == null && gameOver==true) && (
        <Text style={{ marginTop: 20 }}> Bərabərə!</Text>
      )}

      <TouchableOpacity style={styles.restartButton} onPress={restartGame}>
        <Text>Oyunu Yenidən Başlat</Text>
      </TouchableOpacity>
        
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  square: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  boardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: 150,
  },
  restartButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
  },
  gameNameText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  gameNameContainer: {
    marginBottom: 40,
  },
})

export default App;