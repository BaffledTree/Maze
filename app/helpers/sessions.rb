helpers do

  def current_user
        # TODO: return the current user if there is a user signed in.
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
    # This works like this:
      # @current_user || @current_user = User.find() blah blah blah
      # if false, it equals the User.find
      # if true, a = a.
      # if @current_user doesn't exist, then it makes it equal to User.find
  end

  def logged_in?
    !!current_user
  end

  def oauth_consumer
    @consumer ||= OAuth::Consumer.new(
      ENV['CLIENT_ID'],
      ENV['CLIENT_SECRET_ID'],
      :site => "https://api.twitter.com"
      )
  end

  def request_token
    if not session[:request_token]
      host_and_port = request.host
      host_and_port << ":9393" if request.host == "localhost"
      session[:request_token] = oauth_consumer.get_request_token(
        :oauth_callback => "http://127.0.0.1:9393/twitter/callback"
        )
    end
    session[:request_token]
  end

end
