var inputs = document.getElementsByTagName('input')
var buttons = document.getElementsByClassName('for_cmd')
var mov = document.getElementById('mov')
var movi = document.getElementById('movi')
var change = document.getElementById('xchg')
var exe = document.getElementById('exe')
var cmd = document.getElementById('cmd')
var bytes = document.getElementById('bytes')
var randombtn = document.getElementById('random')
randombtn.addEventListener('click', () => {
    for (var input of inputs) {
        input.value = Math.round(Math.random() * 254)
    }
})
function onChange() {
    for (var input of inputs) {
        input.parentNode.classList = ""
    }
    var split = cmd.value.split(' ')
    var command = split[0];
    for (var button of buttons) {
        button.classList.remove('active')
    }
    if (command == 'MOV') {
        document.getElementById('mov').classList.add('active')
    }
    if (command == 'XCHG') {
        document.getElementById('xchg').classList.add('active')
    }
    if (command == 'MOVI') {
        document.getElementById('movi').classList.add('active')
    }
    if (split[1]) {
        var id1 = split[1].split(',')[0].toLowerCase()
        var e1 = document.getElementById(id1)
        if (e1) {
            var elem = e1.parentNode
            elem.classList.add('used')
            if (command == 'MOV') elem.classList.add('to')
            else if (command == 'MOVI') elem.classList.add('from')
            else if (command == 'XCHG') elem.classList.add('change')
        }

    }
    if (split[2]) {
        var id2 = split[2].toLowerCase()
        var e2 = document.getElementById(id2)
        if (e2) {
            var elem = e2.parentNode
            elem.classList.add('used')
            if (command == 'MOV') elem.classList.add('from')
            else if (command == 'MOVI') elem.classList.add('to')
            else if (command == 'XCHG') elem.classList.add('change')
        }

    }
}
for (var pinp of bytes.children) {
    pinp.addEventListener('click', (e) => {
        if (e.target.tagName == 'DIV' || e.target.tagName == 'H4') {
            var parentElem = e.currentTarget
            var inpelem = e.currentTarget.children[1]
            var cmdvalsplit = cmd.value.split(' ')
            var command = cmdvalsplit[0]
            if (command == 'MOV' || command == 'MOVI' || command == 'XCHG') {
                if (cmdvalsplit[1]) {
                    var id1 = cmdvalsplit[1].split(',')[0].toLowerCase()
                    if (parentElem.classList.contains('used') && !cmdvalsplit[2]) {
                        cmd.value = command + " ";
                        parentElem.classList = ''
                    } else if (parentElem.classList.contains('used') && inpelem.id == id1 && cmdvalsplit[2] && cmdvalsplit[2] != "") {
                        alert('CANT REMOVE THIS PART')
                    } else {
                        if (cmdvalsplit[2]) {
                            var id1 = cmdvalsplit[2].toLowerCase()
                            console.log(inpelem)
                            if (parentElem.classList.contains('used')) {
                                cmd.value = command + " " + cmdvalsplit[1];
                                parentElem.classList = ''
                            } else {
                                cmd.value = command + " " + cmdvalsplit[1] + " " + inpelem.id.toUpperCase();
                                document.getElementById(cmdvalsplit[2].toLowerCase()).parentNode.classList = ""
                            }
                        } else {
                            cmd.value += inpelem.id.toUpperCase()
                        }
                    }
                } else {
                    cmd.value += inpelem.id.toUpperCase() + ', '
                }
            } else {
                alert('MISSING COMMAND (MOV, MOVI, XCHG)')
            }
            onChange()
        }
    })
}

cmd.addEventListener('input', onChange)

for (var button of buttons) {
    button.addEventListener('click', (e) => {
        if (!e.currentTarget.classList.contains('active')) {
            var active = document.getElementsByClassName('active');
            if (active[0]) active[0].classList.remove('active')
            e.currentTarget.classList.add('active')
            var cmdvalsplit = cmd.value.split(' ')
            if (cmdvalsplit[0] && !cmdvalsplit[1]) {
                cmd.value = e.currentTarget.id.toUpperCase() + " "
            } else if (!cmdvalsplit[0]) {
                cmd.value = e.currentTarget.id.toUpperCase() + " "
            } else {
                cmdvalsplit[0] = e.currentTarget.id.toUpperCase()
                cmd.value = cmdvalsplit.join(' ')
            }
            onChange()
        }
    })
}
exe.addEventListener('click', () => {
    console.log(cmd.value)
    var valuesplit = cmd.value.split(' ')
    if (valuesplit.length == 3) {
        var command = valuesplit[0];
        var el1 = valuesplit[1].split(',')[0].toLowerCase()
        var el2 = valuesplit[2].toLowerCase()
        switch (command) {
            case 'MOV':
                var vel2 = document.getElementById(el2)
                document.getElementById(el1).value = vel2.value
                break;
            case 'MOVI':
                var vel1 = document.getElementById(el1)
                document.getElementById(el2).value = vel1.value
                break;
            case 'XCHG':
                var vel1 = document.getElementById(el1)
                var vel2 = document.getElementById(el2)
                var temp = vel1.value
                vel1.value = vel2.value
                vel2.value = temp
                break;
            default:
                alert("BŁĄD")
                break;
        }
    }

})