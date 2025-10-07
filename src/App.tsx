import MessageContainer from "./components/MessageContainer";
import MainRouter from "./routes/MainRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MessageContainer>
        <MainRouter />
      </MessageContainer>
    </QueryClientProvider>
  );
};

export default App;
