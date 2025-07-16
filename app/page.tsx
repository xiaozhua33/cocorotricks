// Improved version with rounded cards, gradient backgrounds, progress bar, and visual hierarchy optimization

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Question {
  id: number
  question: string
  options: {
    id: string
    text: string
    value: string
  }[]
}

interface PersonalityResult {
  type: string
  title: string
  description: string
}

const questions: Question[] = [
  { id: 1, question: "迷ったとき、あなたはどうする？", options: [
    { id: "a", text: "すぐ動く", value: "intuition" },
    { id: "b", text: "じっくり考える", value: "logic" },
    { id: "c", text: "人に聞く", value: "empathy" },
  ]},
  { id: 2, question: "休日の過ごし方は？", options: [
    { id: "a", text: "アクティブに外出", value: "intuition" },
    { id: "b", text: "家でゆっくり読書", value: "reflection" },
    { id: "c", text: "友達と会う", value: "empathy" },
  ]},
  { id: 3, question: "新しいプロジェクトが始まるとき", options: [
    { id: "a", text: "すぐに取り掛かる", value: "intuition" },
    { id: "b", text: "計画を立てる", value: "logic" },
    { id: "c", text: "チームで話し合う", value: "empathy" },
  ]},
  { id: 4, question: "悩み事があるとき、あなたは？", options: [
    { id: "a", text: "とにかく行動して解消", value: "intuition" },
    { id: "b", text: "ノートに書き出して整理", value: "reflection" },
    { id: "c", text: "誰かに相談する", value: "empathy" },
  ]},
  { id: 5, question: "次の言葉で一番グッとくるのは？", options: [
    { id: "a", text: "自由", value: "intuition" },
    { id: "b", text: "安定", value: "logic" },
    { id: "c", text: "意味のある人生", value: "reflection" },
  ]},
]

const personalityTypes: Record<string, PersonalityResult> = {
  intuition: { type: "🎯 直感タイプ", title: "本能で動くエネルギー型", description: "とりあえず動く！本能で動くあなたは、\n行動力にあふれています。" },
  reflection: { type: "🧩 内省タイプ", title: "感情や意味を深く考える探求型", description: "内面を大切にし、\n物事の意味を深く考えるタイプです。" },
  logic: { type: "🧠 論理タイプ", title: "客観的に整理してから動く分析型", description: "情報を整理し分析してから行動する、\n理性的なあなた。" },
  empathy: { type: "🌊 感受タイプ", title: "他人の気持ちに敏感、共感重視型", description: "共感力が高く、\n他人の感情を大切にするタイプです。" },
}

export default function QuizPage() {
  const [showStart, setShowStart] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value]
    setAnswers(newAnswers)
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        setShowResult(true)
      }
    }, 300)
  }

  const getPersonalityResult = (): PersonalityResult => {
    const counts = answers.reduce((acc, answer) => {
      acc[answer] = (acc[answer] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    const mostCommon = Object.entries(counts).reduce((a, b) => (a[1] > b[1] ? a : b))[0]
    return personalityTypes[mostCommon] || personalityTypes.intuition
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResult(false)
    setShowStart(true)
  }

  if (showStart) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex flex-col items-center justify-center px-6 py-10 text-center">
        <div className="w-36 h-36 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full mb-6 flex items-center justify-center">
          <img 
            src="/placeholder.png"
            alt="Result bunny"
            className="w-20 h-20 rounded-full mx-auto block" 
          />
        </div>
        <h1 className="text-2xl font-extrabold text-gray-900 mb-4">🧠 深層性格がバレるテスト</h1>
        <p className="text-lg text-gray-700 font-medium mb-3">たった5問で、<br/>あなたの隠れた性格が丸わかり！</p>
        <p className="text-sm text-gray-500 mb-8">今すぐ診断してみよう！</p>
        <Button className="w-full max-w-xs bg-green-500 hover:bg-green-600 text-white text-lg font-bold py-4 rounded-xl" onClick={() => setShowStart(false)}>
          スタート
        </Button>
      </div>
    )
  }

  if (showResult) {
    const result = getPersonalityResult()

    const shareText = encodeURIComponent(
      `私は${result.type}でした！${result.title}。\n` +
      `${result.description}\n\n` +
      `🧠 深層性格がバレるテスト\nたった5問で、あなたの隠れた性格も丸わかり！\n` +
      `https://cocorotricks.com`
    )
      
    const shareUrl = `https://twitter.com/intent/tweet?text=${shareText}`

    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto shadow-xl rounded-2xl">
          <CardContent className="p-8 text-center space-y-6">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center">
            <img 
            src="/placeholder.png"
            alt="Result bunny"
            className="w-20 h-20 rounded-full mx-auto block" 
            />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">{result.type}</h2>
            <h3 className="text-lg font-semibold text-purple-600 mt-2">{result.title}</h3>
            <p className="whitespace-pre-line text-gray-700 leading-relaxed text-base">{result.description}</p>
            <p className="text-gray-500 leading-relaxed text-sm mt-4 mb-0">「隠れた魅力…」詳しく知りたい方は…</p>
            <p className="text-base text-gray-500 font-medium mt-0 leading-relaxed">🔍 あなた専用の性格レポート（無料）<br/><span className="text-base text-purple-500 font-semibold animate-bounce">👇 今すぐチェック！👇</span></p>
            <Button className="w-full bg-green-500 hover:bg-green-600 text-white py-4 text-lg font-bold rounded-xl" onClick={() => window.open("https://page.line.me/768waaamp", "_blank")}>LINEで友だち追加で無料レポート</Button>
            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 text-base font-medium rounded-xl" onClick={() => window.open(shareUrl, "_blank")}>Xでの友達にも診断してもらおう！</Button>
            <Button variant="outline" className="w-full py-3 rounded-xl bg-white text-gray-700 font-semibold border border-gray-300" onClick={resetQuiz}>もう一度診断する</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto space-y-6">
        <div className="mb-4">
          <div className="h-2 bg-purple-200 rounded-full overflow-hidden">
            <div className="h-2 bg-purple-500 transition-all" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}></div>
          </div>
          <div className="text-center text-sm text-gray-500 mt-1">{currentQuestion + 1} / {questions.length}</div>
        </div>
        <Card className="shadow-lg rounded-2xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center">
              <img 
               src="/placeholder.png"
               alt="Result bunny"
               className="w-20 h-20 rounded-full mx-auto block" 
              />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 leading-tight">{question.question}</h1>
            </div>
            <div className="space-y-4">
              {question.options.map((option) => {
                const gradient =
                  option.id === "a"
                    ? "from-yellow-100 to-yellow-50"
                    : option.id === "b"
                    ? "from-blue-100 to-blue-50"
                    : "from-green-100 to-green-50"

                return (
                  <div
                    key={option.id}
                    className={`bg-gradient-to-br ${gradient} rounded-xl shadow hover:shadow-md transition-all`}
                  >
                    <Button
                      variant="ghost"
                      className="w-full text-left text-gray-700 text-base px-4 py-5 rounded-xl bg-transparent font-medium"
                      onClick={() => handleAnswer(option.value)}
                    >
                      {option.text}
                    </Button>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
