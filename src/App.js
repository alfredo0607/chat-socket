import "./App.css";
import Chat1 from "./components/Chat1";
import Chat2 from "./components/Chat2";
import MessageProvider from "./context/MessageContext";

function App() {
  return (
    <MessageProvider>
      <div className="App">
        <div className="cont">
          <Chat1 />
        </div>

        <div className="cont-2">
          <Chat2 />
        </div>
      </div>
    </MessageProvider>
  );
}

export default App;

// PRUEBA TECNICA DE BARTIK

// const [resultsApi, setResultsApi] = useState([]);

// const consultar = async () => {
//   const api = await fetch("https://rickandmortyapi.com/api/character/");

//   const name = await api.json(api);

//   // console.log(name.results);

//   setResultsApi(name.results);
// };

// useEffect(() => {
//   consultar();
// }, []);

// {resultsApi.length !== 0 &&
//   resultsApi.map((data) => (
//     <div key={data.id}>
//       <NmaePersonaje data={data} />
//     </div>
//   ))}
