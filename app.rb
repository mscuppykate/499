require 'sinatra'
require 'json'

helpers do
  def protected!
    return if authorized?
    headers['WWW-Authenticate'] = 'Basic realm="Restricted Area"'
    halt 401, "Not authorized\n"
  end

  def authorized?
    @auth ||=  Rack::Auth::Basic::Request.new(request.env)
    @auth.provided? and @auth.basic? and @auth.credentials and @auth.credentials == ['admin', 'admin']
  end
end

alert = nil

get "/" do
  erb :index
end

get "/map*" do
  erb :map
end

get "/help*" do
  erb :help
end

get "/volunteer*" do
  erb :volunteer
end

get "/info*" do
  erb :info
end
get '/alert*' do
  # Auth check
  protected!

  erb :alert
end

get '/update_alert' do
  alert = params[:alert_message].to_s
  @alert = alert
  erb :update_alert
end

get '/alert_data.json' do
  content_type :json
  {alert_text: alert.to_s}.to_json
end
