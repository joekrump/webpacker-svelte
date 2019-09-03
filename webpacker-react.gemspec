# coding: utf-8
lib = File.expand_path("../lib", __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require "webpacker/svelte/version"

Gem::Specification.new do |spec|
  spec.name = "webpacker-svelte"
  spec.licenses = ["MIT"]
  spec.version = Webpacker::Svelte::VERSION
  spec.authors = ["Renaud Chaput"]
  spec.email = ["renchap@gmail.com"]

  spec.summary = "Provides Svelte integration for Webpacker"
  # spec.description   = %q{TODO: Write a longer description or delete this line.}
  spec.homepage = "https://github.com/will-wow/webpacker-svelte"

  spec.files = `git ls-files -z`.split("\x0").reject do |f|
    f.match(%r{^(test|spec|features)/})
  end
  spec.bindir = "exe"
  spec.executables = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.required_ruby_version = ">= 2.3.0"

  spec.add_dependency "webpacker"

  spec.add_development_dependency "bundler", "~> 1.13"
  spec.add_development_dependency "rake", "~> 12.0"
  spec.add_development_dependency "minitest", "~> 5.0"
  spec.add_development_dependency "capybara"
  spec.add_development_dependency "selenium-webdriver"
end
