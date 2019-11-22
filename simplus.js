#pip install bottle

from bottle import route, run, template,request



@route('/set_wheels')
def set_wheels():
	rw=request.GET.get('rw', '').strip()
	lw=request.GET.get('lw', '').strip()
	
	print("set_wheels")
	return "set_wheels"
	

@route('/set_led')
def set_led():
	status=request.GET.get('status', '').strip()
	if status == "off":
		print("off")
	elif status == "blue":
		print("blue")
	elif status == "green":
		print("green")
	elif status == "red":
		print("red")

	return "set_led"


@route('/get_proximity')
def get_proximity():
	number=request.GET.get('number', '').strip()
	print(number)
	value=0
	return value
	
	
@route('/get_color')
def get_color():
	sensor=request.GET.get('sensor', '').strip()
	color='red'; # blue,green,gray,black
	if sensor == "center":
		print("center")
	elif sensor == "right":
		print("right")
	elif sensor == "left":
		print("left")

	return color
	

	
@route('/get_position')
def get_position():
	position=request.GET.get('position', '').strip()
	value=0;
	if position == "x":
		print("x")
	elif position == "y":
		print("y")
	elif position == "z":
		print("z")

	return value
	
	
@route('/get_orientation')
def get_orientation():
	orientation=request.GET.get('orientation', '').strip()
	value=0;
	if orientation == "Ro":
		print("Ro")
	elif orientation == "Phi":
		print("Phi")
	elif orientation == "Theta":
		print("Theta")

	return value


@route('/get_distance_victim')
def get_distance_victim():
	#calculate min distance to victims
	res={};
	res['a']=0;
	value=0;
	return res;
	
	
@route('/send_action')
def send_action():
	action=request.GET.get('action', '').strip()

	if action == 'Find Victim':
		print("Find Victim")
	elif orientation == "Find Checkpoint":
		print("Find Checkpoint")
	elif orientation == "Rescue Victim":
		print("Rescue Victim")

	
	#calculate min distance to victims
	value=0;
	return value;
 


run(host='localhost', port=8080)
