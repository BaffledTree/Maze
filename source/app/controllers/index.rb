get '/' do
	if logged_in?
		@logged_in = true
	end
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
  user = User.new(params)
  if user.save
    session[:user_id] = user.id
  # else

  end
  redirect "/users/#{user.id}"
end

post '/login' do
  user = User.where(username: params[:username]).first
  unless user.nil?
    session[:user_id] = user.id
  # else

  end
  redirect "/users/#{user.id}"
end

get '/logout' do
  session[:user_id] = nil
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
