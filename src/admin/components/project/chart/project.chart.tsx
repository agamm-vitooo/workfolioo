import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"

type Project = {
  id: string
  name: string
  stack: string
}

interface ProjectChartProps {
  projects: Project[]
}

const ProjectChart = ({ projects }: ProjectChartProps) => {
  // GROUP STACK
  const stackCount: Record<string, number> = {}

  projects.forEach((p) => {
    const stack = p.stack || "Unknown"

    // kalau stack kamu "React, Node, Express"
    // kita bisa split biar lebih realistis
    stack.split(",").forEach((item) => {
      const key = item.trim()

      stackCount[key] = (stackCount[key] || 0) + 1
    })
  })

  const categories = Object.keys(stackCount)
  const data = Object.values(stackCount)

  const options: Highcharts.Options = {
    chart: {
      type: "bar",
      backgroundColor: "transparent",
    },
    title: {
      text: "Tech Stack Usage",
    },
    xAxis: {
      categories,
      title: {
        text: "Tech Stack",
      },
    },
    yAxis: {
      title: {
        text: "Total Usage",
      },
    },
    series: [
      {
        name: "Projects",
        type: "bar",
        data,
        color: "#0f172a",
      },
    ],
    credits: {
      enabled: false,
    },
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}

export default ProjectChart
