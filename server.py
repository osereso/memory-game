from flask import Flask, redirect, request, render_template, url_for


app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def route_index():
    return render_template('start_screen.html')


@app.route('/game', methods=['GET', 'POST'])
def route_game_board():
    cards_number = request.form.to_dict()
    cards_number = int(cards_number['myselect'])
    return render_template('game_screen.html', cards_number=cards_number)

if __name__ == '__main__':
    app.run(debug=True)
