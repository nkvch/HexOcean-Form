import './App.css';
import FormHandler from './components/FormHandler';
import { useSelector } from 'react-redux';

function App() {

  const type = useSelector(state => state.form.dishes ? state.form.dishes.values.type : null);
  const bg = type === 'pizza'
  ? 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
  : type === 'soup'
  ? 'https://images.pexels.com/photos/6072108/pexels-photo-6072108.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
  : type === 'sandwich'
  ? 'https://images.pexels.com/photos/5419208/pexels-photo-5419208.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
  : 'https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';
  
  console.log(type);

  return (
    <div className="App">
    <div className="food-background-image" 
    style={{ 
      backgroundImage: `url(${bg})`,
      }}></div>
      <FormHandler />
    </div>
  );
}

export default App;
