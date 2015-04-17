get '/' do
  session[:errors] = {} if session[:errors].nil?
	if logged_in?
		@logged_in = true
	end
  @error_login = session[:errors][:login] unless session[:errors].nil?
  @error_signup = session[:errors][:signup] unless session[:errors].nil?
  #resets error messages on refresh
  session[:errors][:login] = nil
  session[:errors][:signup] = {}
  erb :index
end

get '/users/:id' do
  if logged_in?
    @logged_in = true
    erb :index
  else
    redirect '/'
  end
end

post '/signup' do
  session[:errors][:signup] = {}
  user = User.new(params)
  if user.save
    session[:user_id] = user.id
  else
    session[:errors][:signup] = {email: user.errors[:email], username: user.errors[:username]}
    redirect '/'
  end
  redirect "/users/#{user.id}"
end

post '/login' do
  session[:errors][:login] = nil
  user = User.where(username: params[:username]).first
  unless user.nil?
    session[:user_id] = user.id
  else
    session[:errors] = {login: "Username/Password combination is incorrect"}
    redirect "/"
  end
  redirect "/users/#{user.id}"
end

get '/logout' do
  session.clear
  session[:errors] = {}
  redirect '/'
end

post '/users/:id/save' do
  Maze.create(content: params[:content], user_id: session[:user_id])
end

get '/users/:id/mazes' do
  user = User.find(session[:user_id])
  mazes = user.mazes
  mazes_content = []
  mazes.each {|maze| mazes_content << maze.content}
  content_type :json
  {mazes: mazes_content}.to_json
end
