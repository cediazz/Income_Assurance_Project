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
import {format} from 'date-fns'

export default function Chart(props){

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip, 
        Legend,
        Filler );
    
    var days = []
    var amount_collected = []
    var amount_real = []
    
    props.data.map((e) =>{
        days.push(format(new Date(e.date + "T00:00:00"), "dd-MM-yyyy"))
        amount_collected.push(e.amount_collected)
        amount_real.push(e.actual_amount)
    })
    var dataSet = {
        labels:days,
        datasets:[{
            label:"Ingresos Diarios Cobrados",
            data:amount_collected,
            tension:0.5,
            fill:true,
            borderColor: "rgb(255,99,132)",
            backgroundColor:"rgba(255,99,132,0.5)",
            pointRadius:5,
            pointBorderColor:"rgb(255,99,132)",
            pointBackgroundColor:"rgb(255,99,132)",
        },
        {
            label:"Ingresos Diarios a Cobrar",
            data:amount_real,
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