import { useEffect, useState } from "react"

type Star = {
  id: number
  size: number
  x: number
  y: number
  opacity: number
  animationDuration: number
}

type Meteor = {
  id: number
  size: number
  x: number
  y: number
  delay: number
  animationDuration: number
}

export function StarBackground() {
  const [stars, setStars] = useState<Star[]>([])
  const [meteors, setMeteors] = useState<Meteor[]>([])

  useEffect(() => {
    generateStars()
    generateMeteors()

    function handleResize() {
      generateStars()
    }

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  function generateStars() {
    const numberOfStars = Math.floor(window.innerWidth * window.innerHeight / 10000)
    const newStars = []

    for (let i = 0; i < numberOfStars; i++) {
      newStars.push({
        id: i,
        size: Math.random() * 3 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.5,
        animationDuration: Math.random() * 4 + 2,
      })
    }

    setStars(newStars)
  }

  function generateMeteors() {
    const numberOfMeteors = Math.floor(window.innerWidth * window.innerHeight / 500000)
    const newMeteors = []

    for (let i = 0; i < numberOfMeteors; i++) {
      const duration = Math.random() * 2 + 2
      newMeteors.push({
        id: i,
        size: Math.random() * 2 + 1,
        x: Math.random() * 100,
        y: Math.random() * 30,
        delay: -(Math.random() * duration),
        animationDuration: duration,
      })
    }

    setMeteors(newMeteors)
  }

  return <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    {stars.map((star) => (
      <div key={star.id} className="star animate-pulse-subtitle" style={{
        width: star.size + "px",
        height: star.size + "px",
        left: star.x + "%",
        top: star.y + "%",
        opacity: star.opacity,
        animationDuration: star.animationDuration + "s",
      }} />
    ))}

    {meteors.map((meteor) => (
      <div key={meteor.id} className="meteor animate-meteor" style={{
        width: meteor.size * 50 + "px",
        height: meteor.size * 2 + "px",
        left: meteor.x + "%",
        top: meteor.y + "%",
        animationDelay: meteor.delay + "s",
        animationDuration: meteor.animationDuration + "s",
      }} />
    ))}
  </div>
}
