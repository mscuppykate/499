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

alert = ""

get "/" do
  @alert = alert
  erb :index
end

get "/map*" do
  @alert = alert
  erb :map
end

get "/help*" do
  @alert = alert
  erb :help
end

get "/volunteer*" do
  @alert = alert
  erb :volunteer
end

get "/info*" do
  @alert = alert
  erb :info
end

get "/who_to_contact*" do
  @alert = alert
  erb :who_to_contact
end

get '/alert*' do
  @alert = alert
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
