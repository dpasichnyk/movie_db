def decoded_jwt_token_from_response
  JWT.decode(response.headers['Authorization'].split(' ').last, MovieDb::Application.credentials.devise_jwt_secret_key, true)
end

def expect_save_ok(record)
  expect([record.save, record.errors.to_a]).to eq([true, []])
end

def me
  described_class.to_s.underscore.to_sym
end