let h = document.querySelector("#heading")
let board = document.querySelector(".play_area")
let res_btn = document.querySelector(".restart")
let points_btn = document.querySelector(".points")
let player_turn = document.querySelector(".turn")
let page_res = document.querySelector(".page_res")
let win = document.getElementById("win")
let win_sym = document.getElementById("win_symbol")

// Transistion out effect
h.setAttribute("style", "transition: all 0.2s ease-out");
board.setAttribute("style", "transition: all 0.2s ease-out");
res_btn.setAttribute("style", "transition: all 0.2s ease-out");
points_btn.setAttribute("style", "transition: all 0.2s ease-out");
page_res.setAttribute("style", "transition: all 0.2s ease-out");

let count = 0      // click event count
let m_d = 0        // match draw count
let x_points = 0   // player X's points
let o_points = 0   // player O's points
let draw = 0       // total match draw count
let matches = 0    // total match count

// marking the element on box
function mark(s)
{
    if (count < 9)
    {
        // two or more clicks on a single box
        if (document.getElementById(s.id).innerHTML != "")
        {
            alert("You are clicking the field which has been clicked already, Start New Game")
            window.location.reload()
        }

        // marking X, O
        if (count % 2 === 0)
        {
            document.getElementById(s.id).innerHTML = "X";
            if (count === 8)
            {
                player_turn.innerHTML = "See the result"
            }
            else if (count < 9)
            {
                player_turn.innerHTML = "player - O's turn"
            }
        }
        else
        {
            document.getElementById(s.id).innerHTML = "O";
            player_turn.innerHTML = "player - X's turn"
        }    
        count += 1
        
        // adding points
        if (result())
        {
            matches += 1
            if (document.getElementById(s.id).innerHTML == 'X')
            {
                m_d += 1
                x_points += 1
            }
            else if (document.getElementById(s.id).innerHTML == 'O')
            {
                m_d += 1
                o_points += 1
            }

            // showing results
            win_sym.innerHTML = document.getElementById(s.id).innerHTML 
            win.innerHTML = "won the Game";
            player_turn.innerHTML = "See the result"
            count -= count

            // if (player_turn.innerHTML === "See the result")
            // {
            //     document.getElementById(s.id).innerHTML = ""
            // }
        }
        
        // match draw block
        if (count > 8 && m_d === 0)
        {
            win_sym.innerHTML = "😑"
            win.innerHTML = "match draw";
            draw += 1
            m_d -= m_d
            matches += 1
        }
    }
}

// block to find which three boxes are same
function result(){
    if (condition_check("b1", "b2", "b3") || condition_check("b4", "b5", "b6") || condition_check("b7", "b8", "b9") || condition_check("b1", "b4", "b7") || condition_check("b2", "b5", "b8") || condition_check("b3", "b6", "b9") || condition_check("b1", "b5", "b9") || condition_check("b3", "b5", "b7"))
    {
        return true
    }
}

// check those three boxes
function condition_check(b1, b2, b3)
{
    if (document.getElementById(b1).innerHTML != "" && document.getElementById(b2).innerHTML != "" && document.getElementById(b3).innerHTML != "" && document.getElementById(b1).innerHTML == document.getElementById(b2).innerHTML && document.getElementById(b2).innerHTML == document.getElementById(b3).innerHTML)
    {
        return true
    }
}

let view_checker =  document.getElementById("view");

// block to hide and show the points table
function view_check()
{
    if (view_checker.style.display === "none") 
    {
        points_btn.innerHTML = "hide points"
        view_checker.style.display = "block";
    } 
    else 
    {
        points_btn.innerHTML = "view points"
        view_checker.style.display = "none";
    }
    
}

// points table
function point()
{
    view_check()

    document.getElementById("t_m").innerHTML = `Matche(s) : ${matches}`
    document.getElementById("p_x").innerHTML = `Player X  : ${x_points}`
    document.getElementById("p_o").innerHTML = `Player O  : ${o_points}`
    document.getElementById("m_d").innerHTML = `Draw      : ${draw}`
}

// next game
function reset()
{
    for (var i = 1; i <= 9; i++)
    {
        document.getElementById("b" + i).innerHTML = ""
    }

    view_checker.style.display = "none"
    points_btn.innerHTML = "view points"
    
    count -= count
    m_d -= m_d 

    player_turn.innerHTML = "Lets START !" 
    win.innerHTML = ""
    win_sym.innerHTML = ""
}

// start new game
function page_reload()
{
    window.location.reload()
}