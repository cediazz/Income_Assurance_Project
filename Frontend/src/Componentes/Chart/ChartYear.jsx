import { 
    Chart as ChartJS, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip, 
    Legend,
    Filler 
} from "chart.js";
import { Line } from "react-chartjs-2";


export default function ChartYear(props){

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip, 
        Legend,
        Filler );
    
    var years = []
    var total_collected = []
    var total_real = []
    
    props.data.map((e) => {
        years.push(e.year)
        total_collected.push(e.total_collected)
        total_real.push(e.total_real)
         
    })
    var dataSet = {
        labels:years,
        datasets:[{
            label:"Ingresos Anuales Cobrados",
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
            label:"Ingresos Anuales a Cobrar",
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

    var options={}
    
    return(
        <Line data={dataSet} options={options} />
    )

}