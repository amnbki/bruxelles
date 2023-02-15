const [game, gamed] = document.getElementsByClassName('helperContainer')[0].children
const [first, second] = [game.children, gamed.children]
const answer = document.getElementsByClassName('answer')[0]

let currentSteps = []

const render = () => {
    for(let row of first) {
        for(cell of row.children) {
            cell.classList.remove('red')
            cell.classList.remove('green')
            cell.classList.remove('blue')
            cell.classList.remove('redgreen')
            cell.classList.remove('bluegreen')
            cell.classList.remove('undefined')
        }
    }
    for(let row of second) {
        for(cell of row.children) {
            cell.classList.remove('red')
            cell.classList.remove('green')
            cell.classList.remove('blue')
            cell.classList.remove('redgreen')
            cell.classList.remove('bluegreen')
            cell.classList.remove('undefined')
        }
    }
    let cont = 0
    for(let i = 0; i < currentSteps.length; i++) {
        if(currentSteps[i+1]) {
            if(currentSteps[i+1].split('')[0] !== currentSteps[i].split('')[0]) {
                cont+=1
            }
        }
    }
    let newSteps = [...currentSteps]
    for(let i = 0; i < newSteps.length; i++) {
        if(newSteps[i+1] === 'green') {
            let greenCounter = 0
    
            for(let j = i+1; j < newSteps.length; j++) {
                if(newSteps[j] !== 'green') break
                greenCounter += 1
            }
            
            for(let j = 0; j < greenCounter; j++) {
                newSteps[i-j] = `${newSteps[i-j]}green`
            }
    
            newSteps.splice(i+1, greenCounter)
        }
    }

    if(cont === 22) {
        let newArr = [...newSteps]
        newArr.splice(0, 12)
        currentSteps = newArr
        cur = cur - 12
    }


    let i = 0
    for(let row of first) {
        for(let cell of row.children) {
            if(currentSteps[i]) {
                cell.classList.remove('red')
                cell.classList.remove('blue')
                cell.classList.remove('green')
                cell.classList.remove('undefined')
                cell.classList.add(currentSteps[i])
                i+=1
            }
            else {
                cell.classList.remove('red')
                cell.classList.remove('blue')
                cell.classList.remove('green')
                cell.classList.remove('undefined')
            }
        }
    }




    let arr = []
    let beetweenArr = []
    for(let i = 0; i < newSteps.length; i++) {
        beetweenArr.push(newSteps[i])
        if(newSteps[i+1]) {
            if(newSteps[i+1].split('')[0] !== newSteps[i].split('')[0]) {
                arr.push(beetweenArr)
                beetweenArr = []
            }
        }
        else {
            arr.push(beetweenArr)
        }
    }


    
    const addRow = () => {
        for(let row of second) {
            const newCell = document.createElement('div')
            newCell.classList.add('cell')
            row.appendChild(newCell)
        }
    }

    
    arr.forEach((row, ind) => {
        row.forEach((cell, i) => {
            if(i > second[0].children.length-1) {
                addRow()
            }
            second[ind].children[i].classList.add(cell)
        })
    })
}


const renderAnswer = (result) => {
    if(result === 'Возврат') {
        answer.classList.add('hidden')
        answer.innerHTML = ''
    }
    else {
        answer.innerHTML = result
        if(result.split(' ')[1] === 'P') {
            answer.classList.add('blueAnswer')
            answer.classList.remove('redAnswer')
            answer.classList.remove('hidden')
        } 
        else {
            answer.classList.add('redAnswer')
            answer.classList.remove('hidden')
            answer.classList.remove('blueAnswer')
        }
    }

}

let cur = 9
const result = () => {
    const wins = []



    let greenCounter = 0
    let counter = 0
    for(let i = 0; i < currentSteps.length; i++) {
        if(currentSteps[i] === 'green') {
            greenCounter += 1
            continue
        }
        if(counter > cur) wins.push(currentSteps[i])
        counter +=1
    }


    if(wins[0]) {
        if(wins[0] === 'red') {
            if(wins[1]) {
                if(wins[1] === 'red') {
                    if(wins[2]) {
                        if(wins[2] === 'red') {
                            cur = currentSteps.length-1-greenCounter
                            return 'Возврат'
                        }
                        else if (wins[2] === 'blue') {
                            if(wins[3]) {
                                if(wins[3] === 'red') {
                                    if(wins[4]) {
                                        cur = currentSteps.length-1-greenCounter
                                        return 'Возврат'
                                    }
                                    else return 'Bet P'
                                }
                                else if(wins[3] === 'blue') {
                                    cur = currentSteps.length-1-greenCounter
                                    return 'Возврат'
                                }
                            }
                            else return 'Bet P'
                        }
                    }
                    else return 'Bet B'
                }
                else if(wins[1] === 'blue') {
                    if(wins[2]) {
                        if(wins[2] === 'red') {
                            cur = currentSteps.length-1-greenCounter
                            return 'Возврат'
                        }
                        else if (wins[2] === 'blue') {
                            if(wins[3]) {
                                if(wins[3] === 'red') {
                                    cur = currentSteps.length-1-greenCounter
                                    return 'Возврат'
                                }
                                else if(wins[3] === 'blue') {
                                    if(wins[4]) {
                                        cur = currentSteps.length-1-greenCounter
                                        return 'Возврат'
                                    }
                                    else return 'Bet P'
                                }
                            }
                            else return 'Bet B'
                        }
                    }
                    else return 'Bet B'
                }
            }
        }
        else if(wins[0] === 'blue'){
            if(wins[1]) {
                if(wins[1] === 'red') {
                    if(wins[2]) {
                        if(wins[2] === 'red') {
                            if(wins[3]) {
                                if(wins[3] === 'red') {
                                    if(wins[4]) {
                                        {
                                            cur = currentSteps.length-1-greenCounter
                                            return 'Возврат'
                                        }
                                    }
                                    else return 'Bet B'
                                }
                                else if(wins[3] === 'blue') {
                                    cur = currentSteps.length-1-greenCounter
                                    return 'Возврат'
                                }
                            }
                            else return 'Bet P'
                        }
                        else if (wins[2] === 'blue') {
                            cur = currentSteps.length-1-greenCounter
                            return 'Возврат'
                        }
                    }
                    else return 'Bet P'
                }
                else if(wins[1] === 'blue') {
                    if(wins[2]) {
                        if(wins[2] === 'red') {
                            if(wins[3]) {
                                if(wins[3] === 'blue') {
                                    if(wins[4]) {
                                        cur = currentSteps.length-1-greenCounter
                                        return 'Возврат'
                                    }
                                    else return 'Bet B'
                                }
                                else if(wins[3] === 'red') {
                                    cur = currentSteps.length-1-greenCounter
                                    return 'Возврат'
                                }
                            }
                            else return 'Bet B'
                        }
                        else if (wins[2] === 'blue') {
                            cur = currentSteps.length-1-greenCounter
                            return 'Возврат'
                        }
                    }
                    else return 'Bet P'
                }
            }
        }
    }
    return 'Возврат'
}
render()

function reset () {
    console.log(currentSteps)
    const newArr = []
    for(let i = currentSteps.length-11; i < currentSteps.length; i++) {
        newArr.push(currentSteps[i])
    }
    currentSteps = []
    currentSteps = newArr
    console.log(currentSteps)
    render()
}

const clear = () => {
    for(let row of first) {
        for(let cell of row.children) {
                cell.classList.remove('undefined')
                cell.classList.remove('red')
                cell.classList.remove('blue')
                cell.classList.remove('green')
        }
    }
}

const buttons = document.getElementsByClassName('buttonsWrapper')[0].children
const resetButton = document.getElementsByClassName('reset')[0]


buttons[0].addEventListener('click', () => {
    currentSteps.push('blue')
    // clear()
    render()
})
buttons[1].addEventListener('click', () => {
    currentSteps.push('red')
    // clear()
    render()
})
buttons[2].addEventListener('click', () => {
    currentSteps.push('green')
    // clear()
    render()
})
buttons[3].addEventListener('click', () => {
    currentSteps.pop()
    // clear()
    render()
})
resetButton.addEventListener('click', () => {
    currentSteps = [];
    render();
})
for(let button of buttons) button.addEventListener('click', () => {
    // console.clear()
    renderAnswer(result())
})
