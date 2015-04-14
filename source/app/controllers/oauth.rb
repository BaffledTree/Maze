get '/twitter/login' do
  redirect request_token.authorize_url
end

get '/twitter/callback' do
  @access_token = request_token.get_access_token(:oauth_verifier => params[:oauth_verifier])

  session.delete(:request_token)
  erb :index
end
