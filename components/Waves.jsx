export function WaveTop(props) {
  return <svg style={{width: "100%", objectFit: "cover"}} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" id="visual" version="1.1" viewBox="0 364 900 87"><path d="M0 364L21.5 374.2C43 384.3 86 404.7 128.8 406C171.7 407.3 214.3 389.7 257.2 380.2C300 370.7 343 369.3 385.8 370C428.7 370.7 471.3 373.3 514.2 376.2C557 379 600 382 642.8 388.7C685.7 395.3 728.3 405.7 771.2 407.3C814 409 857 402 878.5 398.5L900 395L900 451L878.5 451C857 451 814 451 771.2 451C728.3 451 685.7 451 642.8 451C600 451 557 451 514.2 451C471.3 451 428.7 451 385.8 451C343 451 300 451 257.2 451C214.3 451 171.7 451 128.8 451C86 451 43 451 21.5 451L0 451Z" fill={props.color ? props.color : "black"} stroke-linecap="round" stroke-linejoin="miter"/></svg>;
}

export function WaveBottom(props) {
  return <svg style={{width: "100%", objectFit: "cover"}} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" id="visual" version="1.1" viewBox="0 0 900 72"><path d="M0 72L21.5 69.3C43 66.7 86 61.3 128.8 52.8C171.7 44.3 214.3 32.7 257.2 34.2C300 35.7 343 50.3 385.8 55.2C428.7 60 471.3 55 514.2 49.3C557 43.7 600 37.3 642.8 36.7C685.7 36 728.3 41 771.2 37.8C814 34.7 857 23.3 878.5 17.7L900 12L900 0L878.5 0C857 0 814 0 771.2 0C728.3 0 685.7 0 642.8 0C600 0 557 0 514.2 0C471.3 0 428.7 0 385.8 0C343 0 300 0 257.2 0C214.3 0 171.7 0 128.8 0C86 0 43 0 21.5 0L0 0Z" fill={props.color ? props.color : "black"} stroke-linecap="round" stroke-linejoin="miter"/></svg>;
  // return <img src={svgSrc} alt="gray-wave-top" style={{width: "100%", objectFit: "cover"}} />;
}