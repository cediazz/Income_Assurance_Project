import { 
    Chart as ChartJS,
    BarElement, 
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip, 
    Legend,
    Filler 
} from "chart.js";
import { Bar } from "react-chartjs-2";


export default function ChartMonth(props){

    ChartJS.register(
        CategoryScale,
        BarElement ,
        LinearScale,
        PointElement,
        Title,
        Tooltip, 
        Legend,
        Filler );

    var dictMeses = {1:"Enero",2:"Febrero",3:"Marzo",4:"Abril",5:"Mayo",6:"Junio",7:"Julio",8:"Agosto",9:"Septiembre",10:"Octubre",11:"Noviembre",12:"Diciembre"}
    var meses = []
    var total_collected = []
    var total_real = []
    
    props.data.map((e) =>{
        meses.push(dictMeses[e.month])
        total_collected.push(e.total_collected)
        total_real.push(e.total_real)
         
    })
    var dataSet = {
        labels:meses,
        datasets:[{
            label:`Ingresos Mensuales Cobrados`,
            data:total_collected,
            tension:0.5,
            fill:true,
            borderColor: "rgb(255,99,132)",
            backgroundColor:"rgba(255,99,132,0.5)",
            pointRadius:5,
            pointBorderColor:"rgb(255,99,132)",
            pointBackgroundColor:"rgb(255,99,132)",
        },
        {
            label:`Ingresos Mensuales a Cobrar`,
            data:total_real,
            tension:0.5,
            fill:true,
            borderColor: "rgb(25, 14, 235)",
            backgroundColor:"rgba(25, 14, 235,0.5)",
            pointRadius:5,
            pointBorderColor:"rgb(25, 14, 235)",
            pointBackgroundColor:"rgb(25, 14, 235)",
        }]
    }

    var options={
        }
    
    return(
        <Bar data={dataSet} options={options} />
    )

}